import { useNote } from "../useNote";
import { Footer } from "./Footer";
import "./LandingPage.css";
import { Navbar } from "./Navbar";
import { NoteCard } from "./NoteCard";
import { NoteMaker } from "./NoteMaker";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const { state, dispatch } = useNote();
  const searchNoteFunction = (data, meter) => {
    if (meter && meter.length > 0) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(meter.toLowerCase())
      );
    } else {
      return data;
    }
  };
  const filteredNotes = searchNoteFunction(state.notes, state.searchQuery);

  return (
    <div className="common-big-container">
      <Navbar />
      <div className="main-body">
        <div className="leftbar-container">
          <Link to="/labels" className="listbar-links">
            <span className="leftbar-icon-name">
              <i className="list-bar-icons fa-solid fa-tag"></i>
              Labels
            </span>
          </Link>
          <Link to="/archive" className="listbar-links">
            <span className="leftbar-icon-name">
              <i className="list-bar-icons fa-solid fa-box-archive"></i>
              Archive
            </span>
          </Link>
          <Link to="/trash" className="listbar-links">
            <span className="leftbar-icon-name">
              <i class="list-bar-icons fa-solid fa-trash-can"></i>
              Trash
            </span>
          </Link>
          <Link to="/profile" className="listbar-links">
            <span className="leftbar-icon-name">
              <i className="list-bar-icons fa-solid fa-user"></i>
              Profile
            </span>
          </Link>
        </div>
        <div className="landing-page-body">
          <div className="landing-page-note-maker-container">
            <NoteMaker />
          </div>
          <div className="landing-page-note-cards-container">
            {filteredNotes.map((item) => {
              return <NoteCard item={item} key={item._id} type="newNote" />;
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
