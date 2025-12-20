import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Trophy,
  Clock,
  Tag,
  UserCircle,
  Sparkles,
  ArrowLeft,
  Lock,
  CheckCircle,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../components/Loader";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

 

  const {
    data: contest = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contest-payment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
   
  });

  const [timeLeft, setTimeLeft] = useState({});
  const [contestEnded, setContestEnded] = useState(false);

  // Live Countdown
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
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [contest?.deadline]);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  if (isLoading) {
    return <Loader></Loader>
  }

  if (error || !contest || Object.keys(contest).length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400 text-xl">
        Contest not found.
      </div>
    );
  }

  const handlePay = async () => {
    const paymentInfo = {
      price: contest.price,
      contestId: contest._id,
      participant_email: user.email,
      name: contest.name,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    
    window.location.href = res.data.url;
  };
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to={`/contest-details/${id}`}>
          <button className="mb-10 flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-all duration-300 group">
            <ArrowLeft
              size={24}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-semibold text-lg">
              Back to Contest Details
            </span>
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Clean Payment Area (Stripe Ready) */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/80 backdrop-blur border border-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-purple-600/20 rounded-2xl">
                  <Lock size={40} className="text-purple-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-white">
                    Secure Payment
                  </h1>
                  <p className="text-gray-400">
                    Complete your registration by paying the entry fee
                  </p>
                </div>
              </div>

              {/* Contest Summary Card */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white truncate">
                    {contest.name}
                  </h2>
                  <span className="px-4 py-2 bg-purple-600/90 text-white font-bold rounded-full text-sm flex items-center gap-2 whitespace-nowrap">
                    <Tag size={16} />
                    {contest.type?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-2xl">
                  <span className="text-gray-400">Entry Fee</span>
                  <span className="font-black text-green-400">
                    ৳{contest.price}
                  </span>
                </div>
              </div>

              {/* Stripe Placeholder Area - Tmi ekhane Stripe Elements add korbi */}
              <div className="space-y-6">
                <div className="bg-gray-800/40 border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center">
                  <div className="text-gray-500 mb-4">
                    <Lock size={48} className="mx-auto text-purple-400 mb-4" />
                    <p className="text-xl font-semibold text-gray-300">
                      Stripe Payment Integration
                    </p>
                    <p className="text-sm">
                      Add your &lt;Elements&gt; provider and &lt;CardElement
                      /&gt; here
                    </p>
                  </div>
                  <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-8 max-w-md mx-auto">
                    <div className="space-y-4">
                      <div className="h-12 bg-gray-800 rounded-lg animate-pulse"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-12 bg-gray-800 rounded-lg animate-pulse"></div>
                        <div className="h-12 bg-gray-800 rounded-lg animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secure Note */}
                <div className="flex items-center justify-center gap-3 text-green-400 text-sm">
                  <Lock size={20} />
                  <span>End-to-end encrypted • Powered by Stripe</span>
                </div>

                {/* Submit Button - Tmi Stripe handleSubmit e connect korbi */}
                <button
                  onClick={handlePay}
                  disabled={contestEnded}
                  className={`w-full py-6 text-2xl font-black rounded-2xl shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 ${
                    contestEnded
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105"
                  } group`}
                >
                  {contestEnded ? (
                    "Contest Ended - Payment Closed"
                  ) : (
                    <>
                      Pay ৳{contest.price} & Join Contest
                      <CheckCircle
                        size={32}
                        className="group-hover:scale-110 transition"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Contest Info */}
          <div className="space-y-8">
            {/* Prize Pool */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-3xl p-8 text-center">
              <Trophy size={60} className="mx-auto mb-4 text-amber-400" />
              <p className="text-2xl text-gray-300">Prize Pool</p>
              <p className="text-5xl font-black text-white">
                ৳{parseInt(contest.prize).toLocaleString()}
              </p>
            </div>

            {/* Countdown */}
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-3xl p-8">
              {contestEnded ? (
                <div className="text-center">
                  <p className="text-3xl font-black text-red-500">
                    Contest Ended
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Clock size={32} className="text-yellow-400" />
                    <h3 className="text-xl font-bold text-white">
                      Time Remaining
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    {["days", "hours", "minutes", "seconds"].map((unit) => (
                      <div
                        key={unit}
                        className="bg-gray-900/70 rounded-2xl py-4"
                      >
                        <p className="text-3xl font-black text-purple-400">
                          {formatNumber(timeLeft[unit] || 0)}
                        </p>
                        <p className="text-xs text-gray-400 uppercase">
                          {unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Creator & Secure Info */}
            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3">
                <UserCircle size={24} className="text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">Hosted by</p>
                  <p className="text-white font-semibold">
                    {contest.creatorEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Sparkles size={24} className="text-pink-400" />
                <div>
                  <p className="text-gray-400 text-sm">Payment Processor</p>
                  <p className="text-white font-semibold">
                    Stripe (PCI DSS Compliant)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
