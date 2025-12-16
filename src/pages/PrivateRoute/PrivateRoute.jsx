import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()

  if(loading){
    return 
  }
 
};

export default PrivateRoute;
