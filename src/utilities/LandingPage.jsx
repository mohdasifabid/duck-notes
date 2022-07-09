import "./LandingPage.css";
import { useNote } from "../useNote";
import { NoteCard } from "./NoteCard";
import { NoteMaker } from "./NoteMaker";
import { Layout } from "./Layout";
import { useEffect } from "react";
import { needSearchInputStatus } from "./noteActionTypes";

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
  const updatedData = state.notes.filter((item) => {
    if (state.pinned.length > 0) {
      return state.pinned.some((pinnedItem) => pinnedItem._id !== item._id);
    } else {
      return state.notes;
    }
  });
  const filteredNotes = searchNoteFunction(updatedData, state.searchQuery);
  useEffect(() => {
    dispatch({ type: needSearchInputStatus, payload: true });

    return () => {
      dispatch({ type: needSearchInputStatus, payload: false });
    };
  }, []);
  return (
    <Layout>
      <div className="landing-page-body">
        <NoteMaker />
        {state.pinned.length > 0 &&
          state.pinned.map((item) => {
            return <NoteCard item={item} key={item._id} type="pinned" />;
          })}
        {filteredNotes.map((item) => {
          return <NoteCard item={item} key={item._id} type="newNote" />;
        })}
      </div>
    </Layout>
  );
};
