import React, { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PrivateUserRoute = ({children}) => {
    const  axiosSecure = useAxiosSecure()
   useEffect(()=>{
    axiosSecure.get("/users")
   }, [axiosSecure])
};

export default PrivateUserRoute;