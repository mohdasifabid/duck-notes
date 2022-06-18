import { useNote } from "../useNote";
import { useEffect } from "react";
import { getCall } from "./resuableFunctions";
import { NoteCard } from "./NoteCard";
import { getTrash } from "./noteActionTypes";
import { Layout } from "./Layout";

export const TrashPage = ({ item }) => {
  const { state, dispatch } = useNote();
  useEffect(async () => {
    const data = await getCall("/api/trash");
    dispatch({ type: getTrash, payload: data.trash });
  }, []);

  return (
    <Layout>
      <div className="archive-page-body">
        <h2>Trash</h2>
        <div className="archived-notes-container">
          {state.trash.map((note) => {
            return <NoteCard type="trashed" item={note} key={note._id} />;
          })}
        </div>
      </div>
    </Layout>
  );
};
