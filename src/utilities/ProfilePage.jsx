import { useNote } from "../useNote";
import { useEffect } from "react";
import axios from "axios";
import { Layout } from "./Layout";

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
    };
    getUser();
  }, []);

  return (
    <Layout>
      <div className="archive-page-body">
        <p> Profile</p>
        <p> Name</p>
        <p> Email</p>
      </div>
    </Layout>
  );
};
