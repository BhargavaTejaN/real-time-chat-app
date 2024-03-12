/* eslint-disable no-unused-vars */

import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const ProtectedRoute = () => {
  const { authUser } = useAuthContext();
  //console.log("authUser : ",authUser);

  if (!authUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
