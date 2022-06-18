import { useNote } from "../useNote";
import { NoteCard } from "./NoteCard";
import { Layout } from "./Layout";

export const LabelsPage = () => {
  const { state } = useNote();

  return (
    <Layout>
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
    </Layout>
  );
};
