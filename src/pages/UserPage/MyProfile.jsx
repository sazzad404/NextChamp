import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Loader from "../../components/Loader";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  // Editable profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    phone: "",
  });

  // Load profile from localStorage or default
  useEffect(() => {
    if (user) {
      const storageKey = `my-profile-${user.email}`;
      const savedProfile = JSON.parse(
        localStorage.getItem(storageKey) || "null"
      );

      if (savedProfile) {
        setProfile(savedProfile);
      } else {
        setProfile({
          name: user.displayName || "",
          email: user.email || "",
          bio: "",
          address: "",
          phone: "",
        });
      }
    }
  }, [user]);

  // Save profile to localStorage
  const handleSave = () => {
    const storageKey = `my-profile-${user.email}`;
    localStorage.setItem(storageKey, JSON.stringify(profile));
    setIsOpen(false);
  };

  // Fetch participated contests
  const { data: participated = [], isLoading: loadingParticipated } = useQuery({
    queryKey: ["my-participation", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-participation/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch winning contests
  const { data: winnings = [], isLoading: loadingWinnings } = useQuery({
    queryKey: ["my-winnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-winnings-contest");
      return res.data.filter((contest) =>
        contest.winner?.some((w) => w.email === user?.email)
      );
    },
    enabled: !!user?.email,
  });

  const totalParticipated = participated?.length || 0;
  const totalWon = winnings?.length || 0;

  const doughnutData = {
    labels: ["Won", "Lost"],
    datasets: [
      {
        label: "Win Percentage",
        data: [totalWon, totalParticipated - totalWon],
        backgroundColor: ["#10B981", "#EF4444"], // Green for win, Red for lost
        hoverOffset: 4,
      },
    ],
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (loadingParticipated || loadingWinnings) {
    return <Loader />;
  }

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            My Profile
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Manage your personal information
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col items-center lg:items-start lg:flex-row gap-6 sm:gap-8 lg:gap-10">
              {/* Avatar Section */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative shrink-0 group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur-lg transition duration-500"></div>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="Profile"
                  className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-gray-700 shadow-2xl"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-800"></div>
              </motion.div>

              {/* Info Section */}
              <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left w-full">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    {profile.name || "Your Name"}
                  </h3>
                  <p className="text-cyan-400 text-base sm:text-lg mt-1 sm:mt-2 break-all">
                    {profile.email}
                  </p>
                </div>

                {/* Win Percentage Chart */}

                {/* Bio */}
                <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/30">
                  {profile.bio ? (
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {profile.bio}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic text-sm sm:text-base">
                      No bio added yet. Click "Edit Profile" to add one!
                    </p>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              <div className="w-full lg:w-auto lg:shrink-0 flex justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-base sm:text-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
                >
                  Edit Profile
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm overflow-y-auto py-8"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-gray-700 bg-gray-800/50">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Update Your Profile
                </h3>
                <p className="text-gray-400 mt-1 text-sm sm:text-base">
                  Make changes to your personal information
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-200 hover:rotate-90 transform"
                >
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-5 sm:space-y-6 max-h-[60vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition text-sm sm:text-base"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition resize-none text-sm sm:text-base"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition text-sm sm:text-base"
                    placeholder="Your address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition text-sm sm:text-base"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 p-6 sm:p-8 border-t border-gray-700 bg-gray-800/50">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors duration-200 text-sm sm:text-base"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:from-cyan-400 hover:to-blue-400 transition-all duration-200 shadow-lg shadow-cyan-500/30 text-sm sm:text-base"
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700/30 text-center">
        <h3 className="text-white font-bold mb-4">Win Percentage</h3>
        {totalParticipated > 0 ? (
          <Doughnut data={doughnutData} />
        ) : (
          <p className="text-gray-400">
            You haven't participated in any contests yet.
          </p>
        )}
        {totalParticipated > 0 && (
          <p className="text-gray-300 mt-2 text-sm">
            {totalWon} Wins / {totalParticipated} Participated
          </p>
        )}
      </div>
    </section>
  );
};

export default MyProfile;
