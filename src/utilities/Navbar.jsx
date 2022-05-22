import { ListBar } from "./ListBar";
import { Link } from "react-router-dom";
import { useNote } from "../useNote";
import { useAuthProvider } from "../authProvider";

export const Navbar = () => {
  const { state, dispatch } = useNote();
  const { state: authState, dispatch: authDispatch } = useAuthProvider();

  return (
    <div class="duck-navbar-container">
      <ListBar />

      <Link to="/" class="duck-navbar-brand duck-navbar-item">
        <a href="">Make-Notes</a>
      </Link>
      {authState.isLogin === true || authState.isSignedUp === true ? (
        <Link to="/login">
          <a
            onClick={() => {
              authDispatch({ type: "LOGIN_STATUS", payload: false });
              authDispatch({ type: "SIGNUP_STATUS", payload: false });
              localStorage.removeItem("encodedToken");
            }}
          >
            Logout
          </a>
        </Link>
      ) : (
        <Link to="/login">
          <a>Login</a>
        </Link>
      )}
      <div class="duck-navbar-right-items">
        <input
          id="navbarSearchInput"
          className="navbar-search-input"
          placeholder="search note"
          onChange={(e) =>
            dispatch({ type: "SEARCH_NOTE", payload: e.target.value })
          }
        />
      </div>
    </div>
  );
};
