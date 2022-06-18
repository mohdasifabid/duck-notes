import "./NoteMaker.css";
import { useState } from "react";
import { useNote } from "../useNote";
import { getNotes } from "./noteActionTypes";
import { postCall } from "./resuableFunctions";

export const NoteMaker = () => {
  const { dispatch } = useNote();
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
    const data = await postCall("/api/notes", {
      note: noteWithDetails,
    });
    dispatch({ type: getNotes, payload: data.notes });
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
