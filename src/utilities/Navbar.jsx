import { ListBar } from "./ListBar";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../useNote";
import { useAuthProvider } from "../authProvider";
import { searchedNote } from "./noteActionTypes";
import { LOGIN_STATUS, SIGNUP_STATUS } from "./authActionTypes";

export const Navbar = () => {
  const { state, dispatch } = useNote();
  const navigate = useNavigate();
  const { state: authState, dispatch: authDispatch } = useAuthProvider();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
          style={state.needSearchInput ? {} : { display: "none" }}
          id="navbarSearchInput"
          className="navbar-search-input"
          placeholder="search note"
          onChange={(e) =>
            dispatch({ type: searchedNote, payload: e.target.value })
          }
        />
      </div>
      {authState.isLoggedIn ? (
        <span
          className="navbar-login"
          onClick={() => {
            authDispatch({ type: LOGIN_STATUS, payload: false });
            authDispatch({ type: SIGNUP_STATUS, payload: false });
            localStorage.removeItem("encodedToken");
            localStorage.removeItem("currentUser")
          }}
        >
            Logout
        </span>
      ) : (
        <span className="navbar-login" onClick={() => navigate("/login")}>
          Login
        </span>
      )}
    </div>
  );
};
