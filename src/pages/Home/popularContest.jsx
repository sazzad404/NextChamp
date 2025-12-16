import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Trophy,
  DollarSign,
  CalendarDays,
  Code2,
  Users,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router";

const PopularContest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests?limit=6");
      return res.data;
    },
  });

  const approvedContests = [...contests]
    .filter((c) => c.status === "approved")
    .sort((a, b) => b.prize - a.prize)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-purple-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Popular Contests
          </h1>
          <p className="text-gray-400 text-lg">
            Join the hottest competitions running right now!
          </p>
        </div>

        {/* Grid */}
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
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
              </div>

              {/* Top Labels */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-start px-5 pt-5 pointer-events-none">
                <span className="px-4 py-2 bg-purple-600/90 backdrop-blur text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md pointer-events-auto">
                  <Code2 size={15} />
                  {contest.type.toUpperCase()}
                </span>

                <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-black text-lg shadow-2xl flex items-center gap-2 pointer-events-auto">
                  <Trophy size={22} />$
                  {parseInt(contest.prize).toLocaleString()}
                </div>
              </div>

              {/* Rank badge */}
              {index < 3 && (
                <div className="absolute -top-6 -left-6 z-30 pointer-events-none">
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
                    <span>{contest?.participants?.length || 0} people</span>
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
                    Entry: {contest.price}
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

                {/* Button Conditional */}
               {contest.winner?.length > 0 ? (
  <div className="grid grid-cols-2 gap-3 sm:gap-4">
    {/* Disabled Button */}
    <button 
      disabled
      className="py-3 sm:py-3.5 lg:py-4 text-base sm:text-lg font-bold text-gray-400 bg-gray-800/80 rounded-xl shadow-md cursor-not-allowed opacity-70 border border-gray-700 truncate"
    >
      Winner Selected
    </button>
    
    {/* Show Details Button - Fixed Overflow */}
    <Link to={`/contest-details/${contest._id}`} className="block">
      <button className="w-full py-3 sm:py-3.5 lg:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group overflow-hidden">
        <span className="truncate px-2">Show Details</span>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform group-hover:translate-x-3 duration-300"
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
) : (
  <Link to={`/contest-details/${contest._id}`} className="block">
    <button className="w-full py-3 sm:py-5 lg:py-4 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl shadow-xl hover:shadow-purple-500/40 transition-all duration-500 flex items-center justify-center gap-3 sm:gap-4 group hover:scale-[1.02] active:scale-[0.98] overflow-hidden">
      <span className="truncate px-2">Join Now</span>
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 transition-transform group-hover:translate-x-4 duration-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="strokeWidth={2.5}"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </Link>
)}
              </div>

              {/* Subtle ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-purple-500/10 group-hover:ring-purple-500/30 transition-all duration-700 pointer-events-none" />
            </div>
          ))}
        </div>

        {approvedContests.length === 0 && (
          <div className="text-center py-24 text-gray-500 text-xl">
            No approved contests available right now.
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularContest;
