import "./LandingPage.css";
import { useNote } from "../useNote";
import { NoteCard } from "./NoteCard";
import { NoteMaker } from "./NoteMaker";
import { Layout } from "./Layout";

export const LandingPage = () => {
  const { state } = useNote();
  const searchNoteFunction = (data, meter) => {
    if (meter && meter.length > 0) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(meter.toLowerCase())
      );
    } else {
      return data;
    }
  };
  const filteredNotes = searchNoteFunction(state.notes, state.searchQuery);

  return (
    <Layout>
      <div className="landing-page-body">
        <div className="landing-page-note-maker-container">
          <NoteMaker />
        </div>
        <div className="landing-page-note-cards-container">
          {filteredNotes.map((item) => {
            return <NoteCard item={item} key={item._id} type="newNote" />;
          })}
        </div>
      </div>
    </Layout>
  );
};
