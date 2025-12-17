import { useQuery } from "@tanstack/react-query";
import React from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "./Loader";

const WinnerAdSctions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contestsWinner = [], isLoading } = useQuery({
    queryKey: ["contestsWinner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data.filter(
        (c) => c.winnerStatus === "declared" && c.winner?.length > 0
      );
    },
  });

  if (isLoading) {
    return (
      <div className="bg-gray-950 py-20 text-center text-gray-400">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <section className="bg-gray-950 py-16 px-4 md:px-8">
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          🏆 Our Recent Champions
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          These winners proved their skills and earned exciting prize money. You
          could be next — join the contest and shine!
        </p>
      </motion.div>

      {/* STATS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-6 mb-14"
      >
        <div className="bg-gray-900 border border-gray-800 rounded-2xl px-8 py-6 text-center">
          <p className="text-3xl font-bold text-indigo-400">
            {contestsWinner.length}
          </p>
          <p className="text-gray-400 text-sm mt-1">Total Winners</p>
        </div>
      </motion.div>

      {/* WINNER CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {contestsWinner.map((contest, index) => {
          const winner = contest.winner[0];

          return (
            <motion.div
              key={contest._id || index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ scale: 1.06 }}
              className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 
             border border-indigo-500/40 rounded-3xl p-6 shadow-xl
             hover:shadow-indigo-500/30 transition-all duration-300
             overflow-hidden"
            >
              {/* GLOW EFFECT */}
              <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 blur-2xl opacity-0 hover:opacity-100 transition duration-300"></div>

              {/* BADGE */}
              <div className="absolute top-4 right-4 border border-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                🏆 WINNER
              </div>

              {/* CONTENT */}
              <div className="relative z-10">
                {/* IMAGE */}
                <div className="flex justify-center mb-4">
                  <img
                    src={winner?.image}
                    alt={winner?.name}
                    className="w-24 h-24 rounded-full object-cover
                   ring-4 ring-indigo-500 shadow-lg"
                  />
                </div>

                {/* INFO */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">
                    {winner?.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Champion of</p>
                  <p className="text-indigo-400 font-semibold text-sm">
                    {contest.name}
                  </p>
                </div>

                {/* PRIZE */}
                <div className="mt-5 bg-gray-950/60 rounded-xl py-4 text-center border border-gray-700">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Prize Won
                  </p>
                  <p className="text-3xl font-extrabold text-green-400 mt-1">
                    ৳ {contest.prize}
                  </p>
                </div>

                {/* CTA TEXT */}
                <p className="text-xs text-gray-400 text-center mt-5 italic">
                  “You could be the next winner — start competing today!”
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WinnerAdSctions;
