import { useNote } from "../useNote";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useEffect } from "react";
import axios from "axios";

export const ProfilePage = ({ item }) => {
  const { state } = useNote();
  useEffect(() => {
    const token = localStorage.getItem("encodedToken");
    const getUser = async () => {
      const response = await axios.get("/api/user", {
        headers: {
          authorization: token,
        },
      });
      console.log(response);
    };
    getUser();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="archive-page-body">
        <p> Profile</p>
        <p> Name</p>
        <p> Email</p>
      </div>
      <Footer />
    </div>
  );
};
