import { ListBar } from "./ListBar";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../useNote";
import { useAuthProvider } from "../authProvider";
import { searchedNote } from "./noteActionTypes";
import { loginStatus, signupStatus } from "./authActionTypes";

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
      {authState.isLoggedIn === true || authState.isSignedUp === true ? (
        <span
          className="navbar-login"
          onClick={() => {
            authDispatch({ type: loginStatus, payload: false });
            authDispatch({ type: signupStatus, payload: false });
            localStorage.removeItem("encodedToken");
          }}
        >
          <i className="fa-solid fa-user"></i>
          <span style={{ paddingLeft: ".5rem" }}>
            {currentUser && currentUser.firstName + " " + currentUser.lastName}
          </span>
        </span>
      ) : (
        <span className="navbar-login" onClick={() => navigate("/login")}>
          <i className="fa-regular fa-user"></i>
        </span>
      )}
    </div>
  );
};
