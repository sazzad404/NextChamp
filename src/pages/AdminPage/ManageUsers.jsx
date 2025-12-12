import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

  const roles = ["user", "creator", "admin"];

  if (isLoading)
    return <p className="text-center py-10 text-gray-300">Loading users...</p>;

  if (users.length === 0)
    return <p className="text-center py-10 text-gray-400">No users found.</p>;

  const handleMakeRole = (user, role) => {
    const roleInfo = {
      role: role,
    };

    Swal.fire({
      title: `Change role of ${user.name} to ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}`, roleInfo)
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} Maked as ${role}`,
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //   if (result.isConfirmed) {
      //     Swal.fire("Saved!", "", "success");
      //   } else if (result.isDenied) {
      //     Swal.fire("Changes are not saved", "", "info");
      //   }
    });
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 divide-y divide-gray-700 text-gray-100 text-sm md:text-base">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user, index) => (
              <tr
                key={user._id || index}
                className="hover:bg-gray-700 transition"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2 truncate max-w-[200px]">
                  {user.email}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleMakeRole(user, "user")}
                    className={`btn btn-sm ${
                      user.role === "user"
                        ? "btn-success font-bold"
                        : "btn-outline"
                    }`}
                  >
                    User
                  </button>
                  <button
                    onClick={() => handleMakeRole(user, "creator")}
                    className={`btn btn-sm ${
                      user.role === "creator"
                        ? "btn-success font-bold"
                        : "btn-outline"
                    }`}
                  >
                    Creator
                  </button>
                  <button
                    onClick={() => handleMakeRole(user, "admin")}
                    className={`btn btn-sm ${
                      user.role === "admin"
                        ? "btn-success font-bold"
                        : "btn-outline"
                    }`}
                  >
                    Admin
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button className="btn btn-sm btn-error font-bold">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
