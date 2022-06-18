import { useEffect } from "react";
import { Layout } from "./Layout";
import { useNote } from "../useNote";
import { NoteCard } from "./NoteCard";
import { getTrash } from "./noteActionTypes";
import { getCall } from "./resuableFunctions";

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
        {state.trash.map((note) => {
          return <NoteCard type="trashed" item={note} key={note._id} />;
        })}
      </div>
    </Layout>
  );
};
