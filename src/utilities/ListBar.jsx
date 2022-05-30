import "./ListBar.css";
import { Link } from "react-router-dom";
export const ListBar = () => {
  return (
    <div>
      <div className="icons-container">
        <i className="list-bar-list-icon fa-solid fa-list"></i>

        <div className="appear-on-hover">
          <Link to="/" className="listbar-links">
            <span className="appear-on-hover-content">
              <i className="list-bar-icons fa-solid fa-home"></i>
              Home
            </span>
          </Link>
          <Link to="/labels" className="listbar-links">
            <span className="appear-on-hover-content">
              <i className="list-bar-icons fa-solid fa-tag"></i>
              Labels
            </span>
          </Link>
          <Link to="/archive" className="listbar-links">
            <span className="appear-on-hover-content">
              <i className="list-bar-icons fa-solid fa-box-archive"></i>
              Archive
            </span>
          </Link>
          <Link to="/profile" className="listbar-links">
            <span className="appear-on-hover-content">
              <i className="list-bar-icons fa-solid fa-user"></i>
              Profile
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
