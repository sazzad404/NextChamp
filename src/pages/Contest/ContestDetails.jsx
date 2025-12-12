import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Trophy,
  DollarSign,
  Clock,
  Tag,
  UserCircle,
  Users,
  Sparkles,
  ArrowLeft,
  Crown,
  CheckCircle2,
} from "lucide-react";

const ContestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: contest = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  const [timeLeft, setTimeLeft] = useState({});
  const [contestEnded, setContestEnded] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  // Live Countdown based on real deadline
  useEffect(() => {
    if (!contest.deadline) return;

    const calculateTimeLeft = () => {
      const deadline = new Date(contest.deadline).getTime();
      const now = new Date().getTime();
      const difference = deadline - now;

      if (difference <= 0) {
        setContestEnded(true);
        setTimeLeft({});
        return;
      }

      setContestEnded(false);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60) % 60)),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [contest.deadline]);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-purple-500"></span>
      </div>
    );
  }

  // Error State
  if (error || !contest || Object.keys(contest).length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400 text-xl">
        Contest not found or failed to load.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/popular-contests">
          <button className="mb-10 flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-all duration-300 group">
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-lg">Back to Contests</span>
          </button>
        </Link>

        <div className="space-y-12">
          {/* Big Image with Hover Effect */}
          <div className="relative group">
            <div
              className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 ease-out ${
                isImageHovered ? "-translate-y-6 scale-[1.02] shadow-purple-500/40" : ""
              }`}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <img
                src={contest.image}
                alt={contest.name}
                className="w-full h-auto max-h-96 object-cover rounded-3xl transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

              {/* Type Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-6 py-3 bg-purple-600/90 backdrop-blur-lg text-white font-bold rounded-full flex items-center gap-2 shadow-2xl">
                  <Tag size={20} />
                  {contest.type?.toUpperCase()}
                </span>
              </div>

              {/* Prize Badge */}
              <div className="absolute bottom-6 right-6">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-5 rounded-3xl font-black text-3xl shadow-2xl flex items-center gap-4">
                  <Trophy size={40} />
                  ৳{parseInt(contest.prize).toLocaleString()}
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-purple-600/30 via-transparent to-pink-600/30 blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
            </div>
            <p className="text-center mt-4 text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Hover to zoom
            </p>
          </div>

          {/* Contest Name & Creator */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              {contest.name}
            </h1>
            <p className="text-xl text-gray-300 flex items-center justify-center gap-3">
              <UserCircle size={26} />
              Hosted by <span className="font-bold text-purple-300">{contest.creatorEmail}</span>
            </p>
          </div>

          {/* Participants - Static for now (tmi pore dynamic korbi) */}
          <div className="flex items-center justify-center gap-4 text-2xl font-bold text-white">
            <Users size={32} className="text-purple-400" />
            <span>42 Participants</span>
            <span className="text-sm text-green-400 flex items-center gap-1">
              <CheckCircle2 size={18} /> Growing fast!
            </span>
          </div>

          {/* Live Countdown */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-3xl p-8">
            {contestEnded ? (
              <div className="text-center">
                <p className="text-4xl font-black text-red-500">Contest Ended</p>
                <p className="text-gray-400 mt-2">Waiting for winner announcement</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Clock size={32} className="text-yellow-400" />
                  <h3 className="text-2xl font-bold text-white">Time Remaining</h3>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="bg-gray-900/70 rounded-2xl py-5">
                      <p className="text-4xl font-black text-purple-400">{formatNumber(value)}</p>
                      <p className="text-sm text-gray-400 uppercase tracking-wider">{unit}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Prize Pool */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-3xl p-8 text-center">
            <Trophy size={48} className="mx-auto mb-4 text-amber-400" />
            <p className="text-2xl text-gray-300">Total Prize Pool</p>
            <p className="text-6xl font-black text-white">৳{parseInt(contest.prize).toLocaleString()}</p>
          </div>

          {/* Winner Section - Static hidden (tmi pore show korbi) */}
          {/* Uncomment when winner declared */}
          {/* {contest.winnerName && ( ... ) } */}

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Sparkles size={28} className="text-purple-400" />
              Contest Description
            </h2>
            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {contest.description}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Sparkles size={28} className="text-purple-400" />
              Task Details & Instructions
            </h2>
            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {contest.instruction}
            </div>
          </div>

          {/* Entry Fee & Register Button */}
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-400">Entry Fee</p>
              <p className="text-4xl font-black text-green-400 flex items-center justify-center gap-2">
                <DollarSign size={36} />৳{contest.price}
              </p>
            </div>

            <Link to={`/payment/${contest._id}`}
            
              disabled={contestEnded}
              className={`w-full py-6 text-2xl font-black rounded-3xl shadow-2xl transition-all duration-500 transform hover:scale-105 flex items-center justify-center gap-4 ${
                contestEnded
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              } group`}
            >
              {contestEnded ? "Registration Closed" : "Register & Pay Now"}
              {!contestEnded && (
                <svg
                  className="w-8 h-8 transition-transform group-hover:translate-x-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;