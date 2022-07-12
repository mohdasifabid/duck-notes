import {  Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {
  const token = localStorage.getItem("encodedToken");
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login"/>;
  }
};
