import React, { useContext, useEffect, useState } from "react";
import { Trophy, User, Calendar } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const DeclareWinner = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [contests, setContests] = useState([]);
  const [selectedContestId, setSelectedContestId] = useState("");
  const [selectedImage, setSelectedImage] = useState(""); // dynamic image
  const { register, handleSubmit, reset, setValue, control } = useForm();

  const selectedEmail = useWatch({ control, name: "email" });

  useEffect(() => {
    axiosSecure.get(`/contests?creatorEmail=${user?.email}`).then((res) => {
      const approvedContest = res.data.filter((c) => c.status === "approved");
      setContests(approvedContest);
    });
  }, [axiosSecure, user]);

  const selectedContest = contests.find((c) => c._id === selectedContestId);

  // Auto-fill name & image
  useEffect(() => {
    if (!selectedContest || !selectedEmail) return;
    const participant = selectedContest.participants.find(
      (p) => p.email === selectedEmail
    );
    setValue("name", participant?.name || "");
    setSelectedImage(participant?.image || ""); // fill participant image
  }, [selectedEmail, selectedContest, setValue]);

  const handledeclare = (data) => {
    if (selectedContest?.winner?.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Winner already declared!",
        text: "You can only declare one winner per contest.",
      });
      return;
    }

    // Add selected participant image to winner data
    const winnerData = { ...data, image: selectedImage };

    axiosSecure
      .patch(`/contests/${selectedContestId}/winner`, winnerData)
      .then((res) => {
        reset();
        setSelectedImage("");
        if (res.data.modifiedCount) {
          
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Winner Declared Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl p-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 shadow-lg">
              <Trophy size={42} className="text-gray-900" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-white">
            Declare Contest Winner
          </h1>
        </div>

        <form onSubmit={handleSubmit(handledeclare)} className="space-y-6">
          {/* Contest Select */}
          <select
            onChange={(e) => setSelectedContestId(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-4 py-4 text-white outline-none"
          >
            <option value="">Select Contest</option>
            {contests.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Show winner info if already declared */}
          {selectedContest?.winner?.length > 0 && (
            <div className="text-red-400 font-bold text-center py-4">
              Winner already declared:{" "}
              {selectedContest.winner[0].name} (
              {selectedContest.winner[0].email})
              <div className="mt-2">
                {selectedContest.winner[0].image && (
                  <img
                    src={selectedContest.winner[0].image}
                    alt={selectedContest.winner[0].name}
                    className="w-32 h-32 rounded-full mx-auto mt-2"
                  />
                )}
              </div>
            </div>
          )}

          {/* If winner not declared, show form */}
          {(!selectedContest?.winner || selectedContest.winner.length === 0) && (
            <>
              {/* Winner Email */}
              <select
                {...register("email")}
                className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-4 py-4 text-white outline-none"
              >
                <option value="">Select Winner Email</option>
                {selectedContest?.participants?.map((p) => (
                  <option key={p.email} value={p.email}>
                    {p.email}
                  </option>
                ))}
              </select>

              {/* Show selected participant image */}
              {selectedImage && (
                <div className="flex justify-center my-4">
                  <img
                    src={selectedImage}
                    alt="Selected Participant"
                    className="w-32 h-32 rounded-full border-2 border-yellow-400 shadow-lg"
                  />
                </div>
              )}

              {/* Winner Name */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Winner Name
                </label>
                <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-2xl px-4 py-4">
                  <User className="text-green-400" />
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Participant Name"
                    className="bg-transparent outline-none text-white w-full placeholder-gray-500"
                    readOnly
                  />
                </div>
              </div>

              {/* Declare Date */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Declare Date
                </label>
                <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-2xl px-4 py-4 text-white">
                  <Calendar className="text-pink-400" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-8 py-5 text-2xl font-black rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-gray-900 shadow-2xl hover:scale-105 transition-all duration-500"
              >
                🏆 Declare Winner
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default DeclareWinner;
