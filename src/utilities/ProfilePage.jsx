import { useNote } from "../useNote";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const ProfilePage = ({ item }) => {
  const { state } = useNote();
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
