// src/DashboardLayout/Dashboard.jsx  (বা যেখানে আছে)
import React, { useEffect, useState } from "react";
import { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  TrophyIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import NextChampLogo from "../components/NextChampLogo";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user, logOut } = use(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // যদি কোনো ইউজার না থাকে → লগইন পেজে পাঠিয়ে দে
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/users?email=${user.email}`)
        .then((res) => {
          setRole(res.data[0]?.role || "user");
        })
        .catch(() => setRole("user"))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleLogout = () => {
    logOut?.().then((res) => {
      Swal.fire({
        icon: "success",
        title: "Log Out Successful!",
        timer: 1500,
        showConfirmButton: false,
      });
    });
    navigate("/login");
  };

  // রোল অনুযায়ী মেনু
  const menu = {
    admin: [
      { to: "approve", label: "Approve Contests", icon: CheckCircleIcon },
      { to: "manage-users", label: "Manage Users", icon: ShieldCheckIcon },
    ],
    creator: [
      { to: "add-contest", label: "Add Contest", icon: PlusCircleIcon },
      { to: "my-contests", label: "My Contests", icon: PencilSquareIcon },
      { to: "declare-winner", label: "Declare Winner", icon: TrophyIcon },
    ],
    user: [
      { to: "browse", label: "Browse Contests", icon: TrophyIcon },
      { to: "my-participation", label: "My Participation", icon: HomeIcon },
      { to: "profile", label: "My Profile", icon: UserCircleIcon },
    ],
  };

  const navItems = menu[role] || menu.user;

  if (!user) {
    navigate("/login");
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 border-r border-gray-800 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <Link
            to={"/"}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
          >
            <NextChampLogo></NextChampLogo>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition group"
              >
                <Icon className="h-5 w-5 group-hover:scale-110 transition" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoURL || "https://i.ibb.co/0jxTWfH/user.png"}
                  alt="avatar"
                />
              </div>
            </div>
            <div>
              <p className="font-medium text-sm">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">{role} panel</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full btn btn-outline btn-error btn-sm"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-300"
          >
            <Bars3Icon className="h-7 w-7" />
          </button>
          <h2 className="text-2xl font-bold capitalize">{role} Dashboard</h2>
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-gray-900">
              <img
                src={user?.photoURL || "https://i.ibb.co/0jxTWfH/user.png"}
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* এখানে তোর সব পেজ রাউট করবি */}
            <div className="text-center py-20">
              <h1 className="text-5xl font-bold mb-4">
                Welcome,{" "}
                <span className="text-primary">{user?.displayName}</span>!
              </h1>
              <p className="text-xl text-gray-400">
                You are logged in as{" "}
                <span className="text-cyan-400 font-bold capitalize">
                  {role}
                </span>
              </p>
              <p className="mt-6 text-gray-500">
                Choose an option from the sidebar
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
