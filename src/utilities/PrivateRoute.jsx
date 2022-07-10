import {  Outlet, Navigate } from "react-router-dom";
import { useAuthProvider } from "./../authProvider";

export const PrivateRoute = () => {
  const { state } = useAuthProvider();
  if (state.isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/login"/>;
  }
};
