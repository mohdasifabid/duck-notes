import "./App.css";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./utilities/LandingPage";
import { ArchivePage } from "./utilities/ArchivePage";
import { LabelsPage } from "./utilities/Labels";
import { LoginPage } from "./utilities/LoginPage";
import { useEffect } from "react";
import { useAuthProvider } from "./authProvider";
import { Signup } from "./utilities/Signup";
import { PrivateRoute } from "./utilities/PrivateRoute";
import { ProfilePage } from "./utilities/ProfilePage";
import { useNote } from "./useNote";
import { TrashPage } from "./utilities/TrashPage";

function App() {
  const { dispatch: authDispatch, state: authState } = useAuthProvider();
  const { state, dispatch } = useNote();

  useEffect(() => {
    const token = localStorage.getItem("encodedToken");
    if (token) {
      authDispatch({ type: "LOGIN_STATUS", payload: true });
    } else {
      authDispatch({ type: "LOGIN_STATUS", payload: false });
    }

    const getNotes = async () => {
      const response = await axios.get("/api/notes", {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        dispatch({ type: getNotes, payload: response.data.notes });
      }
    };
    getNotes();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route path="/trash" element={<TrashPage />} />
        <Route path="/labels" element={<PrivateRoute />}>
          <Route path="/labels" element={<LabelsPage />} />
        </Route>
        <Route path="/archive" element={<PrivateRoute />}>
          <Route path="/archive" element={<ArchivePage />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
