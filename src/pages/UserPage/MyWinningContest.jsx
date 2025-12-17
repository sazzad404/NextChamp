import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import { Trophy, Calendar, DollarSign, Clock } from "lucide-react";
import Loader from "../../components/Loader";

const MyWinningContest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: winnings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-winnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data.filter((contest) =>
        contest.winner?.some((w) => w.email === user?.email)
      );
    },
    enabled: !!user?.email,
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p className="text-2xl">Please log in to view your winning contests.</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loader></Loader>
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-400">
        <p>Error loading data: {error?.message || "Something went wrong"}</p>
      </div>
    );
  }

  if (winnings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white px-4">
        <Trophy className="w-24 h-24 text-yellow-500 mb-8" />
        <h2 className="text-4xl font-bold mb-4">No Wins Yet!</h2>
        <p className="text-gray-400 text-center max-w-md">
          Keep participating in more contests and claim your victory soon! 🏆
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
        >
           My Winning Contests 
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {winnings.map((contest, index) => {
            const winnerInfo = contest.winner.find((w) => w.email === user?.email) || {};

            return (
              <motion.div
                key={contest._id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.7 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
              >
                {/* Prize Ribbon Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-yellow-400 to-amber-600 text-black font-bold px-10 py-4 rounded-bl-3xl z-10 shadow-xl">
                  <span className="flex items-center gap-2">
                    <Trophy className="w-6 h-6" />
                    ${contest.prize}
                  </span>
                </div>

                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-3 text-yellow-400">
                    {contest.name}
                  </h3>

                  <p className="text-gray-300 mb-5 line-clamp-3">
                    {contest.description}
                  </p>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <span>Entry Fee: ${contest.price}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span>
                        Deadline: {new Date(contest.deadline).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <span className="text-green-400 font-semibold">
                        Winner Declared:{' '}
                        {winnerInfo.declaredAt
                          ? new Date(winnerInfo.declaredAt).toLocaleDateString()
                          : 'Recently'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyWinningContest;