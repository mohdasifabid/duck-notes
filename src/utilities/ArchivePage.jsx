import { Layout } from "./Layout";
import { useEffect } from "react";
import { useNote } from "../useNote";
import { NoteCard } from "./NoteCard";
import { archivedNotes } from "./noteActionTypes";

export const ArchivePage = () => {
  const { state, dispatch } = useNote();

  useEffect(async () => {
    const data = await get("/api/archives");
    dispatch({ type: archivedNotes, payload: data.archives });
  }, []);

  const searchNoteFunction = (data, meter) => {
    if (meter && meter.length > 0) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(meter.toLowerCase())
      );
    } else {
      return data;
    }
  };
  const filteredArchive = searchNoteFunction(state.archive, state.searchQuery);
  return (
    <Layout>
      <div className="archive-page-body">
        <h2>Archived notes</h2>
        {filteredArchive.map((item) => {
          return <NoteCard type="archived" item={item} key={item._id} />;
        })}
      </div>
    </Layout>
  );
};
