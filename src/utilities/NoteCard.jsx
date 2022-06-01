import axios from "axios";
import { useState } from "react";
import { useNote } from "../useNote";
import "./NoteCard.css";
export const NoteCard = ({ item, type }) => {
  const { state, dispatch } = useNote();
  const [updatedTitle, setUpdatedTitle] = useState(item.title);
  const [updatedNote, setUpdatedNote] = useState(item.note);
  const [updatedBgColor, setUpdatedBgColor] = useState(item.bgColor);
  const [updatedLabel, setUpdatedLabel] = useState(item.tag);

  const deleteNote = async (item) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.delete(`/api/notes/${item._id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200) {
      const getNotes = async () => {
        const response = await axios.get("/api/notes", {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          dispatch({ type: "GET_NOTES", payload: response.data.notes });
        }
      };
      getNotes();
    }
  };
  const archiveNote = async (item) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/notes/archives/${item._id}`,
      {
        item,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      dispatch({ type: "ARCHIVED_NOTES", payload: response.data.archives });
      const getNotes = async () => {
        const response = await axios.get("/api/notes", {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          dispatch({ type: "GET_NOTES", payload: response.data.notes });
        }
      };
      getNotes();
    }
  };
  const deleteFromArchive = async (item) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.delete(`/api/archives/delete/${item._id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200) {
      const getData = async () => {
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
    }
  };

  const postUpdatedNote = async (notesId) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/notes/${notesId}`,
      {
        note: {
          ...item,
          title: updatedTitle,
          note: updatedNote,
          tag: updatedLabel,
          bgColor: updatedBgColor,
        },
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      dispatch({ type: "GET_NOTES", payload: response.data.notes });
    }
  };

  return (
    <div
      className="note-card-container"
      style={{ backgroundColor: updatedBgColor }}
    >
      <div className="note-card-inputs-container">
        <input
          style={{ backgroundColor: updatedBgColor }}
          className="note-card-items"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          onBlur={() => {
            postUpdatedNote(item._id);
          }}
        />
        <input
          style={{ backgroundColor: updatedBgColor }}
          className="note-card-items"
          value={updatedNote}
          onChange={(e) => setUpdatedNote(e.target.value)}
          onBlur={() => postUpdatedNote(item._id)}
        />
        <input
          style={{ backgroundColor: updatedBgColor }}
          className="note-card-items"
          value={updatedLabel}
          onChange={(e) => setUpdatedLabel(e.target.value)}
          onBlur={() => postUpdatedNote(item._id)}
        />
      </div>

      <div className="note-card-bottom">
        <p className="bottom-left-side">
          {new Date(item.createdAt).getHours()}:
          {new Date(item.createdAt).getMinutes()}
        </p>
        <div className="bottom-right-side">
          <input
            className="bottom-right-side-color-input"
            value={updatedBgColor}
            type="color"
            onChange={(e) => setUpdatedBgColor(e.target.value)}
            onBlur={() => {
              postUpdatedNote(item._id);
            }}
          />

          <i
            className="note-card-icons fa-solid fa-box-archive"
            onClick={() => {
              archiveNote(item);
            }}
          ></i>

          <i
            className="note-card-icons fa-solid fa-trash-can"
            onClick={() => {
              deleteNote(item);
              deleteFromArchive(item);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};
