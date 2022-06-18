import { ListBar } from "./ListBar";
import { Link } from "react-router-dom";
import { useNote } from "../useNote";
import { useAuthProvider } from "../authProvider";
import { searchedNote } from "./noteActionTypes";

export const Navbar = () => {
  const { state, dispatch } = useNote();
  const { state: authState, dispatch: authDispatch } = useAuthProvider();

  return (
    <div className="duck-navbar-container">
      <div className="navbar-listbar-brand">
        <ListBar />
        <Link to="/" className="duck-navbar-brand duck-navbar-item">
          duckNotes
        </Link>
      </div>
      <div>
        <input
          id="navbarSearchInput"
          className="navbar-search-input"
          placeholder="search note"
          onChange={(e) =>
            dispatch({ type: searchedNote, payload: e.target.value })
          }
        />
      </div>
      {authState.isLoggedIn === true || authState.isSignedUp === true ? (
        <Link
          className="navbar-login"
          to="/login"
          onClick={() => {
            authDispatch({ type: "LOGIN_STATUS", payload: false });
            authDispatch({ type: "SIGNUP_STATUS", payload: false });
            localStorage.removeItem("encodedToken");
          }}
        >
          Logout
        </Link>
      ) : (
        <Link to="/login" className="navbar-login">
          Login
        </Link>
      )}
    </div>
  );
};
