import { useNavigate, Outlet } from "react-router-dom";
import { useAuthProvider } from "./../authProvider";

export const PrivateRoute = () => {
  const { state } = useAuthProvider();
  const navigate = useNavigate();
  if (state.isLoggedIn) {
    return <Outlet />;
  } else {
    return <>{navigate("/login")}</>;
  }
};
