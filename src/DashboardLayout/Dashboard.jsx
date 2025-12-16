import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  TrophyIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  HomeIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

import NextChampLogo from "../components/NextChampLogo";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user, logOut, isdark, setIsdark } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/users?email=${user.email}`)
        .then((res) => {
          setRole(res.data[0]?.role || "user");
        })
        .catch(() => setRole("user"))
        .finally(() => setLoading(false));
    } else {
      setRole("user");
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logOut?.().then(() => {
      Swal.fire({
        icon: "success",
        title: "Log Out Successful!",
        timer: 1500,
        showConfirmButton: false,
      });
    });
  };

  const menu = {
    admin: [
      { to: "/dashboard", label: "Home", icon: HomeIcon },
      { to: "approve-contest", label: "Approve Contests", icon: CheckCircleIcon },
      { to: "manage-users", label: "Manage Users", icon: ShieldCheckIcon },
    ],
    creator: [
      { to: "/dashboard", label: "Home", icon: HomeIcon },
      { to: "add-contest", label: "Add Contest", icon: HomeModernIcon },
      { to: "my-contests", label: "My Contests", icon: PencilSquareIcon },
      { to: "declare-winner", label: "Declare Winner", icon: TrophyIcon },
    ],
    user: [
      { to: "my-wining-contests", label: "My Winning Contests", icon: TrophyIcon },
      { to: "my-participation", label: "My Participation", icon: HomeIcon },
      { to: "my-profile", label: "My Profile", icon: UserCircleIcon },
    ],
  };

  const navItems = menu[role] || menu.user;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="fixed top-0 left-0 h-full w-72 bg-gray-900 border-r border-gray-800 p-6 z-50 overflow-y-auto lg:hidden"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <SidebarContent
              navItems={navItems}
              user={user}
              role={role}
              onClose={() => setSidebarOpen(false)}
              isdark={isdark}
              setIsdark={setIsdark}
              handleLogout={handleLogout}
              currentPath={location.pathname}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:h-full lg:w-72 bg-gray-900 border-r border-gray-800 p-6 overflow-y-auto z-30">
        <SidebarContent
          navItems={navItems}
          user={user}
          role={role}
          onClose={() => {}}
          isdark={isdark}
          setIsdark={setIsdark}
          handleLogout={handleLogout}
          currentPath={location.pathname}
        />
      </aside>

      {/* MAIN CONTENT */}
      <motion.div
        className="flex-1 ml-0 lg:ml-72 min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {/* TOP BAR */}
        <motion.header
          className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-300 p-2 rounded-md hover:bg-gray-800 transition"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <Link className="flex items-center gap-3 text-sm font-semibold text-gray-200">
              <span className="lg:hidden">
                <NextChampLogo />
              </span>
              <span className="hidden lg:inline text-lg font-bold">
                
              </span>
            </Link>
          </div>

          <h2 className="text-lg font-semibold capitalize lg:hidden">
            
          </h2>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <div className="w-11 h-11 rounded-full ring ring-primary ring-offset-2 ring-offset-gray-900 overflow-hidden">
              <img
                src={user?.photoURL || "https://i.ibb.co/0jxTWfH/user.png"}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.header>

        {/* OUTLET CONTENT (NO ROUTE ANIMATION) */}
        <motion.main
          className="flex-1 p-6 md:p-8 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <Outlet context={{ role }} />
        </motion.main>
      </motion.div>
    </div>
  );
};

export default Dashboard;

/* ================= SidebarContent ================= */

const SidebarContent = ({
  navItems,
  user,
  role,
  onClose,
  isdark,
  setIsdark,
  handleLogout,
  currentPath,
}) => {
  return (
    <div className="flex  flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          onClick={onClose}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
        >
          <NextChampLogo />
        </Link>

        <button
          onClick={onClose}
          className="lg:hidden text-gray-400 p-1 rounded-md hover:bg-gray-800 transition"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* NAV ITEMS */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isHome = item.to === "/dashboard";
          const isActive = isHome
            ? currentPath === "/dashboard"
            : currentPath.startsWith(
                item.to.startsWith("/")
                  ? item.to
                  : `/dashboard/${item.to}`
              );

          return (
            <motion.div
              key={item.to}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}
                />
                <span className="text-sm">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* USER PANEL */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={user?.photoURL || "https://i.ibb.co/0jxTWfH/user.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-sm">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-gray-500 capitalize">{role} panel</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="text-gray-400 text-sm">Dark Mode</label>
          <input
            type="checkbox"
            checked={isdark}
            onChange={() => setIsdark(!isdark)}
            className="toggle toggle-sm"
          />
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-red-600 text-red-400 hover:bg-red-600/10 transition"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};
