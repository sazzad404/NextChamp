import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useDebounce from "../hooks/useDebounce";
import { AuthContext } from "../Provider/AuthProvider";
import { MdOutlineExplore } from "react-icons/md";
import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import Loader from "./Loader";

const HeroBanner = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const images = [
    "https://i.ibb.co.com/Zq62xGV/1ce786b7a2ecf128b39b7d792bb4b89c.jpg",
    "https://i.ibb.co.com/Q3hDk4p0/2f0edba6521a6ebf9d4651f07ab8950a.jpg",
    "https://i.ibb.co.com/s7xJqgZ/1b0c5115580949181d140b91d9b6a28b.jpg",
    "https://i.ibb.co.com/qfkS0Ty/16afa5f5a0e8df1bda8a1d769951d239.jpg",
    "https://i.ibb.co.com/ycwChL6d/6ae1436429a4de0819204815d0204382.jpg",
    "https://i.ibb.co.com/kgJqVX4d/e070a0fe5560532153a7bb51dd53a685.jpg",
    "https://i.ibb.co.com/FLmDsSt1/8a1a62717c1a65ccbdf9b97b8484b41e.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [images.length]);

  const variants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  };

  const handleContestClick = (id) => {
    navigate(`/contest-details/${id}`);
  };

  // Fixed query - no blink issue
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests", debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return [];
      const res = await axiosSecure.get(`/contests?search=${debouncedSearch}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  return (
    <div className="relative h-[70vh] min-h-[500px] max-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Slider Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`banner-${currentIndex}`}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 1.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="object-cover w-full h-full brightness-[0.65]"
          />
        </AnimatePresence>

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-5xl mx-auto">
            
            {/* Subtitle with better spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm md:text-base font-semibold tracking-wider uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Discover • Compete • Win Big
              </span>
            </motion.div>

            {/* Main Headline - Compact for 60vh */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 mb-6"
            >
              <h1 className="text-white leading-[1.1]">
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Find the Best
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent mt-2 font-serif italic">
                  Online Contests
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/80 text-base sm:text-lg md:text-xl font-light mt-4 max-w-3xl mx-auto leading-relaxed"
              >
                Join thousands of participants and showcase your skills
              </motion.p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 max-w-2xl mx-auto"
            >
              <div className="relative flex items-center bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-2xl border border-white/30 hover:border-white/50 transition-all duration-300">
                <input
                  type="text"
                  placeholder="Search contests..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-gray-800 focus:outline-none bg-transparent text-base sm:text-lg placeholder-gray-500 font-medium"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>

            {/* CTA Buttons - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/all-contest")}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-2xl hover:shadow-orange-500/60 transition-all duration-300"
              >
                <MdOutlineExplore size={20} />
                Explore Contests
              </motion.button>

              {!user && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-2xl transition-all duration-300"
                >
                  <HiOutlineArrowRightStartOnRectangle size={20} />
                  Get Started
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Search Results - Positioned at bottom, compact cards */}
        {debouncedSearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-4 left-0 right-0 px-4 sm:px-6 lg:px-8 max-h-[35vh] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto">
              {isLoading && (
                <div className="flex justify-center py-4">
                  <Loader />
                </div>
              )}
              
              {!isLoading && contests.length === 0 && (
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 text-center">
                  <p className="text-white/90 text-sm md:text-base font-medium">
                    No contests found for "<span className="text-orange-400">{debouncedSearch}</span>"
                  </p>
                </div>
              )}

              {!isLoading && contests.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {contests.slice(0, 6).map((contest) => (
                    <motion.div
                      key={contest._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      onClick={() => handleContestClick(contest._id)}
                      className="group bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 border border-white/20 hover:border-orange-300/50"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <MdOutlineExplore size={20} />
                        </div>
                        <h3 className="font-bold text-base text-gray-900 line-clamp-1 flex-1 group-hover:text-orange-600 transition-colors duration-300">
                          {contest.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm font-medium truncate">
                        {contest.type || contest.category}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-md px-3 py-2 rounded-full z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "bg-orange-500 w-6 sm:w-8 h-2 shadow-lg shadow-orange-500/50"
                : "bg-white/50 hover:bg-white/80 w-2 h-2"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;