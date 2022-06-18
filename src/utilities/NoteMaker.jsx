import { useState } from "react";
import { useNote } from "../useNote";
import "./NoteMaker.css";
import axios from "axios";
import { getNotes } from "./noteActionTypes";

export const NoteMaker = () => {
  const { state, dispatch } = useNote();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [label, setLabel] = useState("");

  const noteWithDetails = {
    title: title,
    note: note,
    createdAt: new Date(),
    bgColor: "#ffffff",
    tag: label,
  };

  const postNote = async (noteWithDetails) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      "/api/notes",
      {
        note: noteWithDetails,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (response.status === 201) {
      const getNotesHandler = async () => {
        const token = localStorage.getItem("encodedToken");
        const response = await axios.get("/api/notes", {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          dispatch({ type: getNotes, payload: response.data.notes });
        }
      };
      getNotesHandler();
    }
    setTitle("");
    setLabel("");
    setNote("");
  };

  return (
    <div className="inputs-container">
      <input
        autoComplete="off"
        id="titleInput"
        className="title-input inputs"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        autoComplete="off"
        id="noteInput"
        value={note}
        className="note-input inputs"
        placeholder="Take a note..."
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        autoComplete="off"
        id="labelInput"
        className="label-input inputs"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <button
        className="note-maker-btn"
        onClick={() => postNote(noteWithDetails)}
      >
        Save
      </button>
    </div>
  );
};
