import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";

const MyParticipation = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [expandedId, setExpandedId] = useState(null);

  const {
    data: myParticipation = [],
    isLoading,
  } = useQuery({
    queryKey: ["my-participation", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-participation/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>
  }

  const sortedContests = [...myParticipation].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  const isUpcoming = (deadline) => {
    const diff = new Date(deadline) - new Date();
    return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000;
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-12 text-center drop-shadow-lg"
        >
          My Participated Contests
        </motion.h2>

        {/* Empty State */}
        {sortedContests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-white/80">😢 No contests yet!</p>
            <p className="text-white/60 mt-4">
              Discover contests and showcase your creativity.
            </p>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {sortedContests.map((contest) => {
            const isExpanded = expandedId === contest._id;

            return (
              <motion.div
                key={contest._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`
                  group relative bg-black rounded-lg overflow-hidden cursor-pointer
                  transition-all duration-500
                  ${isExpanded ? "scale-105 z-50 shadow-2xl" : "shadow-lg"}
                  hover:scale-105 hover:z-50 hover:shadow-2xl
                `}
                onClick={() => toggleExpand(contest._id)}
              >
                {/* Poster */}
                <div className="relative overflow-hidden">
                  <img
                    src={contest.image}
                    alt={contest.name || "Contest poster"}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {contest.name}
                  </h3>
                </div>

                {/* Expanded Details */}
                <div
                  className={`
                    absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black to-black/80
                    transform transition-all duration-500 ease-out
                    ${isExpanded ? "translate-y-0" : "translate-y-full md:group-hover:translate-y-0"}
                  `}
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {contest.name}
                  </h3>
                  <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                    {contest.description}
                  </p>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Entry Fee:</span>
                      <span className="text-white font-semibold">৳{contest.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prize Money:</span>
                      <span className="text-green-400 font-bold">৳{contest.prize}</span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                      <span
                        className={`font-medium ${
                          isUpcoming(contest.deadline)
                            ? "text-red-400"
                            : "text-gray-300"
                        }`}
                      >
                        ⏳ {new Date(contest.deadline).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full
                          ${
                            contest.paymentStatus === "paid"
                              ? "bg-green-900/70 text-green-300"
                              : "bg-red-900/70 text-red-300"
                          }`}
                      >
                        {contest.paymentStatus?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MyParticipation;
