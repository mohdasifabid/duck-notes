import "./App.css";
import {Routes, Route} from "react-router-dom";
import { LandingPage,  } from "./utilities/LandingPage";
import { ArchivePage } from "./utilities/ArchivePage"
import { LabelsPage } from "./utilities/Labels";
import { LoginPage } from "./utilities/LoginPage";
import { useEffect } from "react";
import { useAuthProvider } from "./authProvider";
import { Signup } from "./utilities/Signup";
import { PrivateRoute } from "./utilities/PrivateRoute";
import { ProfilePage } from "./utilities/ProfilePage";

function App() {
  const {dispatch: authDispatch, state: authState} = useAuthProvider()
  useEffect(()=>{
   const token = localStorage.getItem("encodedToken");
   if(token){
     authDispatch({type: "LOGIN_STATUS", payload: true})
   }else {
    authDispatch({type: "LOGIN_STATUS", payload: false})
   }



  },[])
  return (
  <div>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      {
       (authState.isLogin) ? <Route path="/login" element={<LandingPage/>}/> :
      <Route path="/login" element={<LoginPage/>}/>
      }
      <Route path="/labels" element={<PrivateRoute/>}>
        <Route path="/labels" element={<LabelsPage/>}/>
      </Route>
      <Route path="/archive" element={<PrivateRoute/>}>
        <Route path="/archive" element={<ArchivePage/>}/>
      </Route>
      <Route path="/profile" element={<PrivateRoute/>}>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Route>
    </Routes>
  </div>
  );
}

export default App;
