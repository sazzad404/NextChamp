import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const WinnerAdSctions = () => {
  const axiosSecure = useAxiosSecure();
  const { data: contestsWinner = [] } = useQuery({
    queryKey: ["contestsWinner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data.filter((c) => c.winnerStatus === "declared");
    },
  });
  return (
    <div>
      total winner : {contestsWinner.length}
      {contestsWinner.map((w) => (
        <>
          <p>Contest Name: {w.name}</p>
          <p>Winner Name: {w.winner[0]?.name}</p>
          <p>winner Image: {w.winner[0]?.image}</p>
        </>
      ))}
    </div>
  );
};

export default WinnerAdSctions;
