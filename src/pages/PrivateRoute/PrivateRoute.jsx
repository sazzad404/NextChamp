import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loader from "../../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader text="Authenticating..."></Loader>;
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
