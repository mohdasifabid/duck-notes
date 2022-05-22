import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../authProvider";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Signup = () => {
  const { dispatch: authDispatch } = useAuthProvider();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedEmail, setConfirmedPassword] = useState("");
  const navigate = useNavigate();

  const saveNewUserInfo = async () => {
    const response = await axios.post("/api/auth/signup", {
      name: name,
      email: email,
      confirmedEmail: confirmedEmail,
      password: password,
    });
    if (response.status === 201) {
      authDispatch({ type: "SIGNUP_STATUS", payload: true });
      localStorage.setItem("encodedToken", response.data.encodedToken);
      navigate("/");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-page-body">
        <div className="login-page-inputs-btn-container">
          <label htmlFor="">
            <strong>Name</strong>
            <br />
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </label>
          <label htmlFor="">
            <strong>Email</strong>
            <br />
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="">
            <strong>Password</strong>
            <br />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="">
            <strong>Confirm Password</strong>
            <br />
            <input
              type="password"
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </label>
          <button onClick={saveNewUserInfo}>signup</button>
          <p>
            Already a user?{" "}
            <Link to="/login">
              {" "}
              <a href=""> Login here</a>
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
