import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextChampLogo from "./NextChampLogo";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dbUser, setDbUser] = useState(null);
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users?email=${user.email}`)
        .then((res) => {
          setDbUser(res.data[0]);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "#" },
    { name: "Pricing", href: "#" },
  ];

  const handleLogout = async () => {
    await logOut().then(() => {
      Swal.fire({
        icon: "success",
        title: "Log Out Successful!",
        timer: 1500,
        showConfirmButton: false,
      });
    });
    setDropdown(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-10 w-full bg-black/30 backdrop-blur-lg">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to={"/"}>
            <NextChampLogo size="small" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden ml-auto lg:flex lg:items-center lg:space-x-10">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-base font-semibold text-gray-200 transition-all duration-200 hover:text-white"
              >
                {link.name}
              </a>
            ))}

            {/* Conditional Dashboard link */}
            {user && (
              <a
                href="/dashboard"
                className="text-base font-semibold text-gray-200 transition-all duration-200 hover:text-white"
              >
                Dashboard
              </a>
            )}

            {/* User Dropdown */}
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                  onClick={() => setDropdown(!dropdown)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-600 hover:border-orange-500 transition"
                />

                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-48 bg-gray-900 text-gray-200 rounded-lg shadow-xl overflow-hidden"
                    >
                      <p className="px-4 py-3 text-sm font-semibold border-b border-gray-700">
                        {user.displayName || "User"}
                      </p>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-800"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 shadow-md shadow-orange-500/30"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex p-2 text-white rounded-md lg:hidden hover:bg-gray-800"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/90 text-gray-200 backdrop-blur-lg shadow-xl"
          >
            <div className="flex flex-col px-4 pt-4 pb-6 space-y-4">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-base font-semibold hover:text-orange-400"
                >
                  {link.name}
                </a>
              ))}

              {user && (
                <a
                  href="/dashboard"
                  className="text-base font-semibold hover:text-orange-400"
                >
                  Dashboard
                </a>
              )}

              {user ? (
                <>
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm rounded bg-orange-600 hover:bg-orange-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to={"/login"}
                  className="px-4 py-2 text-sm rounded bg-orange-600 hover:bg-orange-700"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
