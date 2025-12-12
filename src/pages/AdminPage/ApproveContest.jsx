import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
      <p className="text-center py-10 text-gray-300">Loading contests...</p>
    );

  const handleApproveContest = (contest, action) => {
    const statusInfo = {
      status: action,
    };
    axiosSecure.patch(`/contests/${contest._id}`, statusInfo).then((res) => {
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
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/contests/${id}`)
          .then((res) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "🎉 Contest deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100">
        Approve Contests
      </h1>


      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-700 divide-y divide-gray-700 text-gray-100 text-sm md:text-base">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Price</th>
              <th className="px-3 py-2 text-left">Prize</th>
              <th className="px-3 py-2 text-left">Deadline</th>
              <th className="px-3 py-2 text-left">Creator Email</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {contests.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-400">
                  No contests found.
                </td>
              </tr>
            ) : (
              contests.map((contest, index) => (
                <tr
                  key={contest._id}
                  className="hover:bg-gray-700 transition duration-200"
                >
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{contest.name}</td>
                  <td className="px-3 py-2 capitalize">{contest.type}</td>
                  <td className="px-3 py-2">{contest.price}</td>
                  <td className="px-3 py-2">{contest.prize}</td>
                  <td className="px-3 py-2">
                    {new Date(contest.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 truncate max-w-[150px]">
                    {contest.creatorEmail || "N/A"}
                  </td>
                  <td className="px-3 py-2 capitalize">{contest.status}</td>
                  <td className="px-3 py-2 flex flex-col sm:flex-row gap-2">
                    {contest.status === "approved" ? (
                      <button className="btn font-bold btn-sm btn-success w-full sm:w-auto">
                        Approved
                      </button>
                    ) : contest.status === "rejected" ? (
                      <button className="btn font-bold btn-sm ml-1 btn-error w-full sm:w-auto">
                        Rejected
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            handleApproveContest(contest, "approved")
                          }
                          className="btn btn-sm btn-success font-bold w-full sm:w-auto"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleApproveContest(contest, "rejected")
                          }
                          className="btn btn-sm btn-error font-bold w-full sm:w-auto"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {/* Delete button - always visible */}
                    <button
                      onClick={() => handleDelete(contest._id)}
                      className="btn font-bold btn-sm btn-warning w-full sm:w-auto mt-1 sm:mt-0"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="md:hidden flex flex-col gap-4">
        {contests.length === 0 ? (
          <p className="text-gray-400 text-center">No contests found.</p>
        ) : (
          contests.map((contest, index) => (
            <div
              key={contest._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2 text-gray-100"
            >
              <p>
                <span className="font-bold">
                  #{index + 1} - {contest.name}
                </span>
              </p>
              <p>Type: {contest.type}</p>
              <p>Price: {contest.price}</p>
              <p>Prize: {contest.prize}</p>
              <p>Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
              <p>Creator: {contest.creatorEmail || "N/A"}</p>
              <p>Status: {contest.status}</p>
              <td className="px-3 py-2 flex flex-col sm:flex-row gap-2">
                {contest.status === "approved" ? (
                  <button className="btn font-bold btn-sm btn-success w-full sm:w-auto">
                    Approved
                  </button>
                ) : contest.status === "rejected" ? (
                  <button className="btn font-bold btn-sm btn-error w-full sm:w-auto">
                    Rejected
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleApproveContest(contest, "approved")}
                      className="btn btn-sm btn-success font-bold w-full sm:w-auto"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproveContest(contest, "rejected")}
                      className="btn btn-sm btn-error font-bold w-full sm:w-auto"
                    >
                      Reject
                    </button>
                  </>
                )}
                {/* Delete button - always visible */}
                <button
                  onClick={() => handleDelete(contest._id)}
                  className="btn font-bold btn-sm btn-warning w-full sm:w-auto mt-1 sm:mt-0"
                >
                  Delete
                </button>
              </td>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApproveContest;
