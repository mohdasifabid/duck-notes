import { useState, useEffect } from "react";
import { useNote } from "../useNote";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { NoteCard } from "./NoteCard";

export const LabelsPage = ({ item }) => {
  const { state } = useNote();
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
