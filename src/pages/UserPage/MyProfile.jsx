import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Editable profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    phone: "",
  });

  // 🔹 Load from localStorage or auth user
  useEffect(() => {
    if (user) {
      const savedProfile = JSON.parse(localStorage.getItem("my-profile") || "null");
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

  // 🔹 Save profile
  const handleSave = () => {
    localStorage.setItem("my-profile", JSON.stringify(profile));
    setIsOpen(false);
  };

  if (!user) {
    return <p className="text-center py-20 text-gray-400">Loading...</p>;
  }

  return (
    <section className="w-full min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-white mb-12 tracking-tight">
          My Profile
        </h2>

        {/* Profile Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className=" lg:p-12">
            <div className="flex flex-col lg:flex-row items-start gap-10">
              {/* Avatar with glow effect */}
              <div className="relative shrink-0">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-cyan-500 shadow-2xl ring-8 ring-cyan-500/20"
                />
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse"></div>
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-white">{profile.name || "Your Name"}</h3>
                  <p className="text-cyan-400 text-lg mt-1">{profile.email}</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-4">
                  <span className="px-5 py-2 rounded-full bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/50">
                    Active Member
                  </span>
                  <span className="px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/50">
                    Verified Account
                  </span>
                </div>

                {/* Bio */}
                {profile.bio ? (
                  <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">{profile.bio}</p>
                ) : (
                  <p className="text-gray-500 italic">No bio added yet. Click Edit to add one!</p>
                )}

                {/* Contact Details */}
                {(profile.address || profile.phone) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-700/50">
                    {profile.address && (
                      <div className="flex items-start gap-4">
                        <svg className="w-6 h-6 text-cyan-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="text-sm uppercase tracking-wider text-gray-500">Address</p>
                          <p className="text-white font-medium">{profile.address}</p>
                        </div>
                      </div>
                    )}
                    {profile.phone && (
                      <div className="flex items-start gap-4">
                        <svg className="w-6 h-6 text-cyan-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1a31.23 31.23 0 01-13.636-3.636A31.23 31.23 0 013 5z" />
                        </svg>
                        <div>
                          <p className="text-sm uppercase tracking-wider text-gray-500">Phone</p>
                          <p className="text-white font-medium">{profile.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <div className="shrink-0">
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-8 py-4 rounded-xl bg-cyan-500 text-black font-bold text-lg hover:bg-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white">Update Your Profile</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition"
                  placeholder="Your address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 p-8 border-t border-gray-700 bg-gray-800/50">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyProfile;