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

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests", debouncedSearch],
    enabled: !!debouncedSearch,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests${debouncedSearch ? `?search=${debouncedSearch}` : ""}`
      );
      return res.data;
    },
  });

  return (
    <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
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
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="object-cover w-full h-full brightness-70"
          />
        </AnimatePresence>

        {/* Strong gradient overlay for perfect text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl"> {/* Limited width for better readability */}

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white/90 text-xl md:text-2xl font-medium tracking-widest uppercase"
            >
              Discover. Compete. Win Big.
            </motion.h2>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                Find the best
                <br />
                <span className="font-serif italic text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                  online contests
                </span>
              </h1>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 max-w-2xl"
            >
              <div className="flex items-center bg-white/95 backdrop-blur-xl rounded-full px-8 py-6 shadow-2xl border border-white/40">
                <input
                  type="text"
                  placeholder="Search by contest name or category…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-black focus:outline-none bg-transparent text-lg md:text-xl placeholder-gray-500"
                />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/all-contest")}
                className="px-10 py-5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg md:text-xl flex items-center gap-3 shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
              >
                <MdOutlineExplore size={28} />
                Explore Contests
              </motion.button>

              {!user && (
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/register")}
                  className="px-10 py-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-lg md:text-xl flex items-center gap-3 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  <HiOutlineArrowRightStartOnRectangle size={28} />
                  Get Started
                </motion.button>
              )}
            </motion.div>

            {/* Search Results Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16"
            >
              {isLoading && (
                <Loader></Loader>
              )}
              {!isLoading && contests.length === 0 && debouncedSearch && (
                <p className="text-white/90 text-lg">
                  No contests found for "{debouncedSearch}"
                </p>
              )}

              {contests.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {contests.map((contest) => (
                    <motion.div
                      key={contest._id}
                      whileHover={{ y: -8 }}
                      onClick={() => handleContestClick(contest._id)}
                      className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl cursor-pointer transition-all duration-300 border border-white/30"
                    >
                      <h3 className="font-bold text-2xl text-gray-900">
                        {contest.name}
                      </h3>
                      <p className="text-gray-600 text-lg mt-3">
                        {contest.type || contest.category}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-white w-10 shadow-lg"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;