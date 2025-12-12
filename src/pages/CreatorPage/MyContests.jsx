import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyContests = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: contests = [],
    isLoading,
  } = useQuery({
    queryKey: ["my-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests?creatorEmail=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center text-gray-300">Loading...</p>;

  if (contests.length === 0) return <p>No Contest Yet</p>;
  const handleUpdateContest = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedContest = {
      name: form.name.value,
      price: form.price.value,
      prize: form.prize.value,
      type: form.type.value,
      image: form.image.value,
      description: form.description.value,
      instruction: form.instruction.value,
    };

    axiosSecure
      .put(`/contests/${selectedContest._id}`, updatedContest)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Update successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          setIsOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteContest = (id) => {
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
            if (res.data.deletedCount) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "🎉 Contest deleted successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">
        My Created Contests : {contests.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 divide-y divide-gray-700 text-gray-100 text-sm md:text-base">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {contests.map((contest, index) => (
              <tr key={index} className="hover:bg-gray-700 transition">
                <td className="px-4 py-2">{index + 1}</td>

                <td className="px-4 py-2">{contest.name}</td>

                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold
                      ${
                        contest.status === "pending"
                          ? "bg-yellow-600/30 text-yellow-400"
                          : contest.status === "approved"
                          ? "bg-green-600/30 text-green-400"
                          : "bg-red-600/30 text-red-400"
                      }`}
                  >
                    {contest.status.charAt(0).toUpperCase() +
                      contest.status.slice(1)}
                  </span>
                </td>

                <td className="px-4 py-2 flex flex-col sm:flex-row gap-2">
                  {/* Only show Edit & Delete if status = pending */}
                  {contest.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedContest(contest);
                          setIsOpen(true);
                        }}
                        className="btn btn-sm btn-warning w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteContest(contest._id)}
                        className="btn btn-sm btn-error w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {/* See Submissions Always Shows */}
                  <button className="btn btn-sm btn-info w-full sm:w-auto">
                    See Submissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && selectedContest && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 text-gray-100 rounded-xl shadow-lg w-full max-w-xl p-6 overflow-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Edit Contest
            </h2>

            <form onSubmit={handleUpdateContest} className="space-y-4">
              {/* Name */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Contest Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedContest.name}
                  className="input input-bordered w-full bg-gray-800 text-gray-100"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedContest.price}
                  className="input input-bordered w-full bg-gray-800 text-gray-100"
                />
              </div>

              {/* Prize */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Prize</label>
                <input
                  type="number"
                  name="prize"
                  defaultValue={selectedContest.prize}
                  className="input input-bordered w-full bg-gray-800 text-gray-100"
                />
              </div>

              {/* Type */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-200">Type</label>
                <select
                  name="type"
                  defaultValue={selectedContest.type}
                  className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition"
                >
                  <option value="">Select type</option>
                  <option value="design">Design</option>
                  <option value="writing">Writing</option>
                  <option value="development">Development</option>
                  <option value="gaming">Gaming</option>
                  <option value="music">Music</option>
                </select>
              </div>

              {/* Image URL */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedContest.image}
                  className="input input-bordered w-full bg-gray-800 text-gray-100"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedContest.description}
                  className="textarea textarea-bordered w-full bg-gray-800 text-gray-100"
                  rows={3}
                />
              </div>

              {/* Instruction */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Instruction</label>
                <textarea
                  name="instruction"
                  defaultValue={selectedContest.instruction}
                  className="textarea textarea-bordered w-full bg-gray-800 text-gray-100"
                  rows={3}
                />
              </div>

              {/* Deadline */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  defaultValue={selectedContest.deadline.split("T")[0]}
                  className="input input-bordered w-full bg-gray-800 text-gray-100"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-error flex-1 sm:flex-none"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-success flex-1 sm:flex-none"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyContests;
