import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading)
    return <Loader></Loader>

  if (users.length === 0)
    return (
      <p className="text-center py-10 text-gray-400">No users found.</p>
    );

  const handleMakeRole = (user, role) => {
    Swal.fire({
      title: `Change role of ${user.name} to ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, { role }).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is now ${role}`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <motion.div
      className="p-4 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100">
        Manage Users
      </h1>

      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-700 divide-y divide-gray-700 text-gray-100">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {users.map((user, index) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3 truncate max-w-[220px]">
                  {user.email}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  {["user", "creator", "admin"].map((role) => (
                    <motion.button
                      key={role}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMakeRole(user, role)}
                      className={`btn btn-sm ${
                        user.role === role
                          ? "btn-success font-bold"
                          : "btn-outline"
                      }`}
                    >
                      {role}
                    </motion.button>
                  ))}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="md:hidden flex flex-col gap-4">
        {users.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow"
          >
            <p className="font-semibold text-lg">
              #{index + 1} {user.name}
            </p>
            <p className="text-sm text-gray-400 truncate">{user.email}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {["user", "creator", "admin"].map((role) => (
                <motion.button
                  key={role}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMakeRole(user, role)}
                  className={`btn btn-sm w-full ${
                    user.role === role
                      ? "btn-success font-bold"
                      : "btn-outline"
                  }`}
                >
                  {role}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ManageUsers;
