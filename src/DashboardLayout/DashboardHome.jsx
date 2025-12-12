// src/DashboardLayout/DashboardHome.jsx
import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useOutletContext } from "react-router";

const DashboardHome = () => {
  const context  = useOutletContext();
   const role = context?.role || "user";

  const { user } = useContext(AuthContext);
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">
        Welcome, <span className="text-primary">{user?.displayName}</span>!
      </h1>

      <p className="text-xl text-gray-400">
        You are logged in as
        <span className="text-cyan-400 ml-2 font-bold capitalize">{role}</span>
      </p>

      <p className="mt-6 text-gray-500">Choose an option from the sidebar</p>
    </div>
  );
};

export default DashboardHome;
