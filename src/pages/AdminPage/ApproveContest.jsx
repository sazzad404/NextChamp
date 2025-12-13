import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ApproveContest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: contests = [],
    isLoading,
  } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10 text-gray-300"
      >
        Loading contests...
      </motion.p>
    );

  const handleApproveContest = (contest, action) => {
    axiosSecure.patch(`/contests/${contest._id}`, { status: action }).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Contest ${action} successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}`).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Contest deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        });
      }
    });
  };

  return (
    <motion.div
      className="p-4 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100">
        Approve Contests
      </h1>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-700 divide-y divide-gray-700 text-gray-100">
          <thead className="bg-gray-800">
            <tr>
              {["#", "Name", "Type", "Price", "Prize", "Deadline", "Creator", "Status", "Actions"].map(
                (h) => (
                  <th key={h} className="px-3 py-2 text-left text-sm font-semibold">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {contests.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-400">
                  No contests found.
                </td>
              </tr>
            ) : (
              contests.map((contest, index) => (
                <motion.tr
                  key={contest._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="hover:bg-gray-700/50"
                >
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{contest.name}</td>
                  <td className="px-3 py-2 capitalize">{contest.type}</td>
                  <td className="px-3 py-2">{contest.price}</td>
                  <td className="px-3 py-2">{contest.prize}</td>
                  <td className="px-3 py-2">
                    {new Date(contest.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 truncate max-w-[160px]">
                    {contest.creatorEmail || "N/A"}
                  </td>
                  <td className="px-3 py-2 capitalize">{contest.status}</td>
                  <td className="px-3 py-2 flex flex-wrap gap-2">
                    {contest.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApproveContest(contest, "approved")}
                          className="btn btn-sm btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproveContest(contest, "rejected")}
                          className="btn btn-sm btn-error"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(contest._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= CARD (MOBILE) ================= */}
      <div className="md:hidden flex flex-col gap-4">
        {contests.map((contest, index) => (
          <motion.div
            key={contest._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-800 rounded-xl p-4 shadow-lg text-gray-100"
          >
            <h2 className="font-bold text-lg mb-2">
              #{index + 1} {contest.name}
            </h2>

            <div className="text-sm space-y-1">
              <p>Type: {contest.type}</p>
              <p>Price: {contest.price}</p>
              <p>Prize: {contest.prize}</p>
              <p>Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
              <p>Status: {contest.status}</p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              {contest.status === "pending" && (
                <>
                  <button
                    onClick={() => handleApproveContest(contest, "approved")}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproveContest(contest, "rejected")}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => handleDelete(contest._id)}
                className="btn btn-warning btn-sm"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ApproveContest;
