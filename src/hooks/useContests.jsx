import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';

const useContests = (search) => {
   const axiosSecure = useAxiosSecure()
  return useQuery({
    queryKey: ["contests", search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests${search ? `?search=${search}` : ""}`
      );
      return res.data;
    },
    enabled: search !== undefined,
  });
};

export default useContests;