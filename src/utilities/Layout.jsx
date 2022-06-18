import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";

export const Layout = ({ children }) => {
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
        <div className="landing-page-body">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
