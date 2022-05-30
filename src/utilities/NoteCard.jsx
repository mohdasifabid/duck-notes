import axios from "axios";
import { useState } from "react";
import { useNote } from "../useNote";
import "./NoteCard.css";
export const NoteCard = ({ item, type }) => {
  const { state, dispatch } = useNote();
  const [titleUpdate, setTitleUpdate] = useState(item.title);
  const [noteUpdate, setNoteUpdate] = useState(item.note);
  const [bgColor, setBgColor] = useState(item.bgColor);
  const [labelUpdate, setLabelUpdate] = useState(item.tag);

  const deleteNote = async (item) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.delete(`/api/notes/${item._id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200) {
      const getNotes = async () => {
        const token = localStorage.getItem("encodedToken");
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
        const token = localStorage.getItem("encodedToken");
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
    }
  };

  return (
    <div className="note-card-container" style={{ backgroundColor: bgColor }}>
      <div className="note-card-inputs-container">
        <input
          style={{ backgroundColor: bgColor }}
          className="note-card-items"
          value={titleUpdate}
          onChange={(e) => setTitleUpdate(e.target.value)}
          onBlur={() => {
            updateNote(item);
            dispatch({
              type: "UPDATE_NOTE",
              payload: { ...item, title: titleUpdate, note: noteUpdate },
            });
          }}
        />
        <input
          style={{ backgroundColor: bgColor }}
          className="note-card-items"
          value={noteUpdate}
          onChange={(e) => setNoteUpdate(e.target.value)}
          onBlur={() =>
            dispatch({
              type: "UPDATE_NOTE",
              payload: { ...item, title: titleUpdate, note: noteUpdate },
            })
          }
        />
        <input
          style={{ backgroundColor: bgColor }}
          className="note-card-items"
          value={labelUpdate}
          onChange={(e) => setLabelUpdate(e.target.value)}
          onBlur={() =>
            dispatch({
              type: "UPDATE_NOTE",
              payload: { ...item, label: labelUpdate },
            })
          }
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
            value={bgColor}
            type="color"
            onChange={(e) => setBgColor(e.target.value)}
            onBlur={() => {
              dispatch({
                type: "UPDATE_NOTE",
                payload: { ...item, bgColor },
              });
            }}
          />

          <i className="fa-solid fa-tag"></i>

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
