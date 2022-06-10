import { useNote } from "../useNote";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { NoteCard } from "./NoteCard";
import { Link } from "react-router-dom";

export const LabelsPage = () => {
  const { state } = useNote();

  return (
    <div className="common-big-container">
      <Navbar />
      <div className="main-body">
        <div className="leftbar-container">
          <Link to="/" className="listbar-links">
            <span className="leftbar-icon-name">
              <i className="list-bar-icons fa-solid fa-home"></i>
              Home
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
              <i className="list-bar-icons fa-solid fa-trash-can"></i>
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
        <div className="archive-page-body">
          <h1>Labelled notes</h1>
          <div className="archived-notes-container">
            {state.notes.map((item) => {
              return (
                <div key={item._id}>
                  <h2>{item.tag}</h2>
                  <NoteCard type="label" item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
