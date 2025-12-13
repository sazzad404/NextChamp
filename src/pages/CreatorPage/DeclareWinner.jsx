import React, { useContext, useEffect, useState } from "react";
import { Trophy, User, Mail, Award, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const DeclareWinner = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [contests, setContests] = useState([]);
  const [selectedContestId, setSelectedContestId] = useState("");
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosSecure.get(`/contests?creatorEmail=${user?.email}`).then((res) => {
      const approvedContest = res.data.filter((c) => c.status === "approved");
      setContests(approvedContest);
    });
  }, [axiosSecure, user]);

  const handledeclare = (data) => {
    const winnerUpdate = {
      email: data.email,
      name: data.name,
      position: data.position,
    };
    console.log(winnerUpdate);
    axiosSecure
      .patch(`/contests/${selectedContestId}/winner`, winnerUpdate)
      .then((res) => {
        reset();
        console.log(res);
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Winner Declare successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        err;
      });
  };

  const selectedContest = contests.find((c) => c._id === selectedContestId);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 shadow-lg">
              <Trophy size={42} className="text-gray-900" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-white">
            Declare Contest Winner
          </h1>
          <p className="text-gray-400 mt-2">
            Select the best participant and finalize the result
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handledeclare)} className="space-y-6">
          {/* Contest Name (readonly UI) */}
          <select
            onChange={(e) => setSelectedContestId(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-4 py-4 text-white outline-none"
          >
            <option value="">Select Contest</option>
            {contests.map((contest) => (
              <option value={contest._id} key={contest._id}>
                {contest.name}
              </option>
            ))}
          </select>

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
              />
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Winning Position
            </label>
            <select
              {...register("position", { required: true })}
              className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-4 py-4 text-white outline-none"
            >
              {["1st", "2nd", "3rd"].map((pos, index) => {
                // UPDATED: disable already declared positions
                const isTaken = selectedContest?.winners?.some(
                  (w) => w.position === pos
                );
                return (
                  <option value={pos} key={index} disabled={isTaken}>
                    {pos === "1st"
                      ? "🥇 1st Place"
                      : pos === "2nd"
                      ? "🥈 2nd Place"
                      : "🥉 3rd Place"}
                    {isTaken ? " (Declared)" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Declared Date */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Declare Date
            </label>
            <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-2xl px-4 py-4 text-white">
              <Calendar className="text-pink-400" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full mt-8 py-5 text-2xl font-black rounded-3xl
            bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500
            text-gray-900 shadow-2xl
            hover:scale-105 transition-all duration-500"
          >
            🏆 Declare Winner
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Once declared, winner details cannot be changed.
        </p>
      </div>
    </div>
  );
};

export default DeclareWinner;
