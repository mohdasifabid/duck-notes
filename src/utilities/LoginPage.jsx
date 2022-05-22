import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../authProvider";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

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

  return (
    <div>
      <Navbar />
      <div className="login-page-body">
        <div className="login-page-inputs-btn-container">
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
          <button onClick={saveEmailPassword}>Login</button>
          <p>
            Not a user?
            <Link to="/signup">
              <a href="">Create account</a>
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
