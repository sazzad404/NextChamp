import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SeeSubmissions = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: contest,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contest", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-purple-500"></span>
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="text-center text-red-400 py-20">
        Failed to load contest submissions
      </div>
    );
  }

  const participants = contest.participants || [];

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Total Submissions: {participants.length}
      </h2>

      {participants.length === 0 ? (
        <p className="text-gray-400 text-center">No submissions yet</p>
      ) : (
        <div className="space-y-4">
          {participants.map((p, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-md text-white transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="mb-2">
                <span className="font-semibold text-purple-400">Email:</span>{" "}
                {p.email}
              </p>

              <p className="mb-2">
                <span className="font-semibold text-green-400">Task:</span>{" "}
                {p.task ? p.task : "❌ Incomplete"}
              </p>

              {p.paymentAt && (
                <p className="text-sm text-gray-400">
                  Submitted on:{" "}
                  {new Date(p.paymentAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeeSubmissions;
