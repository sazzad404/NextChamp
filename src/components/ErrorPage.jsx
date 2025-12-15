import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // jodi react-router use koro, na hole <a> use koro

const Error404 = () => {
  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden relative flex items-center justify-center">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-zinc-950 to-indigo-900/20" />
        
        {/* Moving Gradient Blobs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, 300, 0],
            y: [0, -300, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, -300, 0],
            y: [0, 300, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Particles (small dots) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            y: [-100, window.innerHeight + 100],
            x: Math.random() * window.innerWidth,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-white/90 tracking-tighter"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="mt-8 text-3xl sm:text-5xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Oops! The page you're looking for seems to have wandered off into the void. 
            Don't worry, we'll help you get back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12"
        >
          <Link
            to="/"
            className="inline-block px-10 py-5 text-lg font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-indigo-600/50 hover:scale-105"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Error404;