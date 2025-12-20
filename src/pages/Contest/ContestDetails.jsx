import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Trophy,
  DollarSign,
  Clock,
  Tag,
  UserCircle,
  Users,
  Sparkles,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";

const ContestDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [isImageHovered, setIsImageHovered] = useState(false);

  const {
    data: contest = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  const [timeLeft, setTimeLeft] = useState({});
  const [contestEnded, setContestEnded] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!contest.deadline) return;

    const calculateTimeLeft = () => {
      const deadline = new Date(contest.deadline).getTime();
      const now = new Date().getTime();
      const difference = deadline - now;

      if (difference <= 0) {
        setContestEnded(true);
        setTimeLeft({});
        return;
      }

      setContestEnded(false);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [contest.deadline]);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  if (isLoading) {
     <Loader></Loader>;
  }

  if (error || !contest || Object.keys(contest).length === 0) {
    return (
      <div className="h-screen bg-gray-950 flex items-center justify-center text-red-400 text-xl">
        Contest not found or failed to load.
      </div>
    );
  }

  const currentParticipant = contest.participants?.find(
    (p) => p.email === user?.email
  );

  const isParticipant = !!currentParticipant;
  const hasSubmittedTask =
    currentParticipant?.task && currentParticipant.task.trim() !== "";

  const winner = contest.winner?.[0];

  const handleTaskSubmit = async () => {
    if (!taskText.trim()) {
      Swal.fire("Oops!", "Please enter your task details or link.", "warning");
      return;
    }

    try {
      const response = await axiosSecure.patch(`/submit-task/${contest._id}`, {
        email: user.email,
        task: taskText,
        name: user.displayName,
        image: user.photoURL,
      });

      if (response.data.success) {
        setShowModal(false);
        setTaskText("");
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Task Submitted Successfully!",
          text: "Good luck in the contest! 🎉",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to submit task",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/popular-contests">
          <button className="mb-10 flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-all duration-300 group">
            <ArrowLeft
              size={24}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-semibold text-lg">Back to Contests</span>
          </button>
        </Link>

        <div className="space-y-12">
          {/* Contest Image */}
          <div className="relative group">
            <div
              className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 ease-out ${
                isImageHovered
                  ? "-translate-y-6 scale-[1.02] shadow-purple-500/40"
                  : ""
              }`}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <img
                src={contest.image}
                alt={contest.name}
                className="w-full h-auto max-h-96 object-cover rounded-3xl transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="px-6 py-3 bg-purple-600/90 backdrop-blur-lg text-white font-bold rounded-full flex items-center gap-2 shadow-2xl">
                  <Tag size={20} />
                  {contest.type?.toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-5 rounded-3xl font-black text-3xl shadow-2xl flex items-center gap-4">
                  <Trophy size={40} />৳
                  {parseInt(contest.prize).toLocaleString()}
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-purple-600/30 via-transparent to-pink-600/30 blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
            </div>
            <p className="text-center mt-4 text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Hover to zoom
            </p>
          </div>

          {/* Contest Title & Host */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              {contest.name}
            </h1>
            <p className="text-xl text-gray-300 flex items-center justify-center gap-3">
              <UserCircle size={26} />
              Hosted by{" "}
              <span className="font-bold text-purple-300">
                {contest.creatorEmail}
              </span>
            </p>
          </div>

          {/* Participants Count */}
          <div className="flex items-center justify-center gap-4 text-2xl font-bold text-white">
            <Users size={32} className="text-purple-400" />
            <span>{contest.participants?.length || 0} Participants</span>
          </div>

          {/* Countdown - hide if winner declared */}
          {!winner && (
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-3xl p-8">
              {contestEnded ? (
                <div className="text-center">
                  <p className="text-4xl font-black text-red-500">
                    Contest Ended
                  </p>
                  <p className="text-gray-400 mt-2">
                    Waiting for winner announcement
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Clock size={32} className="text-yellow-400" />
                    <h3 className="text-2xl font-bold text-white">
                      Time Remaining
                    </h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div
                        key={unit}
                        className="bg-gray-900/70 rounded-2xl py-5"
                      >
                        <p className="text-4xl font-black text-purple-400">
                          {formatNumber(value)}
                        </p>
                        <p className="text-sm text-gray-400 uppercase tracking-wider">
                          {unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Prize Pool */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-3xl p-8 text-center">
            <Trophy size={48} className="mx-auto mb-4 text-amber-400" />
            <p className="text-2xl text-gray-300">Total Prize Pool</p>
            <p className="text-6xl font-black text-white">
              ৳{parseInt(contest.prize).toLocaleString()}
            </p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Sparkles size={28} className="text-purple-400" />
              Contest Description
            </h2>
            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {contest.description}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Sparkles size={28} className="text-purple-400" />
              Task Details & Instructions
            </h2>
            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {contest.instruction}
            </div>
          </div>

          {/* Winner Section */}
          {winner && (
            <div className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/50 rounded-3xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">🏆 Winner</h2>
              <img
                src={winner.image}
                alt={winner.name}
                className="w-32 h-32 rounded-full mx-auto border-4 border-yellow-400 shadow-lg mb-4"
              />
              <p className="text-2xl font-bold text-purple-300">
                {winner.name}
              </p>
              <p className="text-xl text-gray-300">{winner.email}</p>
            </div>
          )}

          {/* Entry Fee & Action Buttons */}
          <div className="space-y-6">
            {!winner && !isParticipant ? (
              <Link to={`/payment/${contest._id}`}>
                <button className="w-full py-6 text-2xl font-black rounded-3xl shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center gap-4">
                  Register & Pay Now
                </button>
              </Link>
            ) : !winner && isParticipant && !hasSubmittedTask ? (
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-6 text-2xl font-black rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-2xl flex items-center justify-center gap-4"
              >
                Submit Your Task
                <Sparkles
                  size={32}
                  className="group-hover:rotate-12 transition-transform"
                />
              </button>
            ) : hasSubmittedTask && !winner ? (
              <div className="w-full py-10 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-500/50 rounded-3xl text-center">
                <CheckCircle
                  size={80}
                  className="mx-auto mb-6 text-green-400"
                />
                <p className="text-4xl font-black text-green-300">
                  Task Submitted!
                </p>
                <p className="text-xl text-gray-300 mt-4">
                  Your submission:{" "}
                  <span className="text-purple-300 font-semibold">
                    "{currentParticipant.task}"
                  </span>
                </p>
                <p className="text-lg text-gray-400 mt-3">
                  Thank you! Best of luck 🎉
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Task Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 w-full max-w-2xl shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-6 text-center">
              Submit Your Task
            </h2>
            <textarea
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Paste your work link or write your submission details here..."
              className="w-full h-48 p-5 rounded-2xl bg-gray-900 text-white border border-gray-700 focus:border-purple-500 focus:outline-none resize-none text-lg"
            />
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setShowModal(false);
                  setTaskText("");
                }}
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-2xl text-white font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleTaskSubmit}
                disabled={!taskText.trim()}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white font-black transition transform hover:scale-105 flex items-center gap-3"
              >
                <CheckCircle size={24} />
                Submit Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
