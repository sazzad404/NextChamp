import React from "react";
import { Link } from "react-router-dom";
import { XCircle, ArrowLeft, Home, RefreshCw } from "lucide-react";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Main Cancelled Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl p-10 text-center space-y-8">
          {/* Cancel Icon with Subtle Glow */}
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
            <XCircle size={128} className="relative text-red-400 mx-auto drop-shadow-2xl" />
          </div>

          {/* Main Message */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-white">
              Payment Cancelled
            </h1>
            <p className="text-2xl text-gray-300">
              No worries! Your payment was not processed.
            </p>
            <p className="text-lg text-gray-400">
              You have not been charged and are not registered for the contest yet.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
            <RefreshCw size={48} className="mx-auto mb-4 text-purple-400" />
            <p className="text-xl text-gray-300">
              You can try again anytime before the contest deadline.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            {/* Primary: Try Payment Again */}
            <Link to={-1}> {/* -1 means go back to previous page (usually contest details or payment) */}
              <button className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-xl rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 flex items-center gap-4">
                <ArrowLeft size={28} className="group-hover:-translate-x-2 transition-transform" />
                Try Payment Again
              </button>
            </Link>

            {/* Secondary Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/dashboard/my-participation">
                <button almak className="px-8 py-4 bg-gray-800/70 hover:bg-gray-800 border border-gray-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center gap-3">
                  <Home size={24} />
                  My Participations
                </button>
              </Link>

              <Link to="/popular-contests">
                <button className="px-8 py-4 bg-gray-800/70 hover:bg-gray-800 border border-gray-700 text-white font-bold text-lg rounded-2xl transition-all duration-300">
                  Explore Contests
                </button>
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-500 pt-8">
            If you encountered any issues, feel free to contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;