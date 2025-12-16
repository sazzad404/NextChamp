import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useDebounce from "../hooks/useDebounce";
import { AuthContext } from "../Provider/AuthProvider";
import { MdOutlineExplore } from "react-icons/md";
import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";

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
    <div className="relative h-[70vh]  min-h-[500px] pt-32 pb-12 flex items-center">
      {/* Slider Background */}
      <div className="absolute inset-0 overflow-hidden">
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
            className="object-cover w-full h-full brightness-75"
          />
        </AnimatePresence>

        {/* Stronger dark overlay – ekhon kono bright/white image asleo text perfect readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          <div className="w-full lg:w-2/3 xl:w-1/2">
            {/* Subtitle */}
            <h1 className="font-sans text-lg font-medium tracking-wider text-white/90 drop-shadow-lg">
              Discover. Compete. Win Big.
            </h1>

            {/* Main Headline */}
            <p className="mt-6 tracking-tight">
              <span className="font-sans font-bold text-6xl sm:text-7xl text-white drop-shadow-2xl">
                Find the best
              </span>
              <br />
              <span className="font-serif italic font-bold text-7xl sm:text-8xl text-white drop-shadow-2xl">
                online contests
              </span>
            </p>

            {/* Search Bar – aro premium feel */}
            <div className="mt-12">
              <div className="flex items-center bg-white/95 backdrop-blur-lg rounded-full px-6 py-5 shadow-2xl border border-white/30">
                <input
                  type="text"
                  placeholder="Search by contest name or category…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-black focus:outline-none bg-transparent text-lg placeholder-gray-600"
                />
              </div>
            </div>
            {/* CTA BUTTONS */}
            <motion.div
              className="mt-10 flex flex-wrap gap-6 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Explore Contests */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 flex items-center gap-2 py-4 rounded-full bg-orange-500 text-white font-semibold text-lg shadow-xl hover:shadow-orange-500/40 transition-all"
                onClick={() => navigate("/all-contest")}
              >
                <MdOutlineExplore size={24} />
                Explore Context
              </motion.button>

              {/* Get Started – only for non-logged users */}
              {!user && (
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 flex items-center gap-2 rounded-full 
             text-white font-semibold text-lg relative border-2 border-transparent 
             overflow-hidden transition-all shadow-lg hover:shadow-2xl
             before:absolute before:inset-0 before:rounded-full before:border-2 
             before:border-gradient-to-r before:from-blue-800 before:to-cyan-800 before:animate-pulse"
                  onClick={() => navigate("/register")}
                >
                  <HiOutlineArrowRightStartOnRectangle size={24} />
                  Get Start
                </motion.button>
              )}
            </motion.div>

            {/* Contest Cards */}
            <div className="mt-8">
              {isLoading && (
                <p className="text-white/90 text-lg">Loading contests...</p>
              )}
              {!isLoading && contests.length === 0 && debouncedSearch && (
                <p className="text-white/90 text-lg">
                  No contests found for "{debouncedSearch}"
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {contests.map((contest) => (
                  <div
                    key={contest._id}
                    onClick={() => handleContestClick(contest._id)}
                    className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 hover:scale-[1.03] border border-white/20"
                  >
                    <h3 className="font-bold text-xl text-black">
                      {contest.name}
                    </h3>
                    <p className="text-gray-700 text-base mt-2">
                      {contest.type || contest.category}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Dots – aro clean */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
              idx === currentIndex
                ? "bg-white shadow-lg shadow-white/50 scale-150"
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
