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
      navigate("/login");
    }
  };

  return (
    <div className="singup-page">
      <div className="login-page-inputs-btn-container">
        <label htmlFor="">Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />

        <label htmlFor="">Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="">Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />

        <button onClick={saveNewUserInfo}>signup</button>
        <p>
          Already a user? <Link to="/login"> Login here</Link>
        </p>
      </div>
    </div>
  );
};
