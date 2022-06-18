import { getDefaultNormalizer } from "@testing-library/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../authProvider";

export const LoginPage = () => {
  const { dispatch: authDispatch, state: authState } = useAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const saveEmailPassword = async () => {
    const response = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      authDispatch({ type: "LOGIN_STATUS", payload: true });
      localStorage.setItem("encodedToken", response.data.encodedToken);
      navigate("/");
    }
  };
  const guestLoginHandler = async () => {
    const response = await axios.post("/api/auth/login", {
      email: "ducknotes@gmail.com",
      password: "duckNotes123",
    });
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("encodedToken", response.data.encodedToken);
      authDispatch({ type: "LOGIN_STATUS", payload: true });
      navigate("/");
    }
  };

  return (
    <div className="login-page-body">
      <div className="login-page-inputs-btn-container">
        <label htmlFor="">Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="">Password</label>

        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={saveEmailPassword}>Login</button>
        <button onClick={guestLoginHandler}>Login as Guest</button>
        <p>
          Not a user?
          <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
};
