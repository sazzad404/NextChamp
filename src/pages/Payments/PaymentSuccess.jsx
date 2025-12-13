import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Trophy, Sparkles, ArrowRight } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id')
  const axiosSecure = useAxiosSecure()
  console.log(sessionId);

  useEffect(()=>{
    if(sessionId){
        axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data);
        })
    }
  },[sessionId, axiosSecure])
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Main Success Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl p-10 text-center space-y-8">
          {/* Success Icon with Glow */}
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
            <CheckCircle
              size={128}
              className="relative text-green-400 mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Main Message */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-white">
              Payment Successful!
            </h1>
            <p className="text-2xl text-gray-300">
              Congratulations! You have successfully registered for the contest.
            </p>
            <div className="flex items-center justify-center gap-3 text-lg text-purple-300">
              <Sparkles size={28} className="animate-pulse" />
              <span>You are now an official participant</span>
              <Sparkles size={28} className="animate-pulse" />
            </div>
          </div>

          {/* Prize Reminder */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-8">
            <Trophy size={48} className="mx-auto mb-4 text-amber-400" />
            <p className="text-xl text-gray-300">
              Compete and win the amazing prize pool!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            <Link to="/dashboard/my-participation">
              <button className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-xl rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 flex items-center gap-4">
                View My Participated Contests
                <ArrowRight
                  size={28}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </Link>

            <Link to="/popular-contests">
              <button className="px-10 py-5 bg-gray-800/70 hover:bg-gray-800 border border-gray-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 flex items-center gap-3">
                Explore More Contests
                <Sparkles size={24} />
              </button>
            </Link>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-500 pt-8">
            Thank you for joining! Best of luck in the competition 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
