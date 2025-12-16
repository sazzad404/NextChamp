import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Trophy,
  DollarSign,
  CalendarDays,
  Code2,
  Users,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom"; // ✅ use react-router-dom

const AllContest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  // ✅ Sort by deadline first, then prize
  const approvedContests = [...contests]
    .filter((c) => c.status === "approved")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .sort((a, b) => b.prize - a.prize);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-purple-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-3xl bg-gray-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            All Contest
          </h1>
          <p className="text-gray-400 text-lg">
            Join the hottest competitions running right now!
          </p>
        </div>

        {/* Grid */}
        {approvedContests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedContests.map((contest, index) => (
              <div
                key={contest._id}
                className="group relative bg-gray-900/80 backdrop-blur border border-gray-800 rounded-2xl 
                  transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10
                  hover:-translate-y-3"
                style={{ overflow: "visible" }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={contest.image || "/placeholder.jpg"}
                    alt={contest.name || "Contest"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
                </div>

                {/* Top Labels */}
                <div className="absolute top-0 left-0 right-0 flex justify-between items-start px-5 pt-5">
                  <span className="px-4 py-2 bg-purple-600/90 backdrop-blur text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md">
                    <Code2 size={15} />
                    {contest.type?.toUpperCase() || "N/A"}
                  </span>

                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-black text-lg shadow-2xl flex items-center gap-2">
                    <Trophy size={22} />৳
                    {parseInt(contest.prize || 0).toLocaleString()}
                  </div>
                </div>

                {/* Rank badge */}
                {index < 3 && (
                  <div className="absolute -top-6 -left-6 z-30">
                    <div className="relative">
                      <div
                        className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full 
                          flex items-center justify-center text-black font-black text-3xl 
                          shadow-2xl border-4 border-gray-950"
                      >
                        {index + 1}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-amber-400 blur-2xl opacity-50 -z-10 scale-125"></div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative p-7 pt-20">
                  <h3 className="text-2xl font-bold text-white mb-3 line-clamp-1">
                    {contest.name}
                  </h3>

                  {/* Extra Info */}
                  <div className="flex flex-col gap-2 mb-5 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span className="font-semibold text-purple-400 flex items-center gap-1">
                        <UserCircle size={15} /> Creator:
                      </span>
                      <span>{contest.creatorEmail || "Unknown"}</span>
                    </div>

                    <div className="flex justify-between text-gray-300">
                      <span className="font-semibold text-purple-400 flex items-center gap-1">
                        <Users size={15} /> Participants:
                      </span>
                      {/* ✅ FIX: show count instead of raw object */}
                      <span>{contest.participants?.length || 0} people</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                    {contest.description}
                  </p>

                  {/* Entry + Deadline */}
                  <div className="flex justify-between items-center mb-7 text-sm">
                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                      <DollarSign size={19} />
                      Entry: ৳{contest.price}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CalendarDays size={18} />
                      {new Date(contest.deadline).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                      })}
                    </div>
                  </div>

                  {/* Button */}
                  <Link to={`/contest-details/${contest._id}`}>
                    <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group">
                      Join Now
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>

                {/* Subtle ring */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-purple-500/10 group-hover:ring-purple-500/30 transition-all duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-500 text-xl">
            No approved contests available right now.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContest;
