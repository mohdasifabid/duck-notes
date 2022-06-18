import { useNote } from "../useNote";
import { NoteCard } from "./NoteCard";
import { Layout } from "./Layout";

export const LabelsPage = () => {
  const { state } = useNote();

  return (
    <Layout>
      <div className="archive-page-body">
        {state.notes.map((item) => {
          return (
            <>
              <p>{item.tag}</p>
              <NoteCard type="label" item={item} key={item._id} />
            </>
          );
        })}
      </div>
    </Layout>
  );
};
