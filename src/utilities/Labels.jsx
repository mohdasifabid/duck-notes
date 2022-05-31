import { useState, useEffect } from "react";
import { useNote } from "../useNote";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { NoteCard } from "./NoteCard";

export const LabelsPage = () => {
  const { state } = useNote();
  const [notesByLabels, setNotesByLabels] = useState([]);

  // useEffect(() => {
  //   const createNewNotesData = () => {
  //     let newArr = [];
  //     let newObj = {};
  //     let data = state.notes;
  //     let result = data.map((note) => {
  //       if (newObj[note.tag] === undefined) {
  //         return (newObj[note.tag] = note);
  //       } else {
  //         return (newObj[note.tag] = [...newObj[note.tag], note]);
  //       }
  //     });
  //   };
  //   createNewNotesData();
  // }, []);

  return (
    <div>
      <Navbar />
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
      <Footer />
    </div>
  );
};
