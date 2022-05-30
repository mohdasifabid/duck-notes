import axios from "axios";
import { useEffect } from "react";
import { useNote } from "../useNote";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { NoteCard } from "./NoteCard";

export const ArchivePage = ({ item }) => {
  const { state, dispatch } = useNote();
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get("/api/archives", {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        dispatch({ type: "ARCHIVED_NOTES", payload: response.data.archives });
      }
    };
    getData();
  }, []);

  const searchNoteFunction = (data, meter) => {
    if (meter && meter.length > 0) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(meter.toLowerCase())
      );
    } else {
      return data;
    }
  };
  const filteredArchive = searchNoteFunction(state.archive, state.searchQuery);
  return (
    <div>
      <Navbar />
      <div className="archive-page-body">
        <h2>Archived notes</h2>
        <div className="archived-notes-container">
          {filteredArchive.map((item) => {
            return <NoteCard type="archived" item={item} key={item._id} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
