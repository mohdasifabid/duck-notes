import { useNote } from "../useNote";
import { Footer } from "./Footer";
import "./LandingPage.css";
import { Navbar } from "./Navbar";
import { NoteCard } from "./NoteCard";
import { NoteMaker } from "./NoteMaker";

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
  const filteredNotes = searchNoteFunction(state.notes, state.searchQuery);

  return (
    <div>
      <Navbar />
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
      <Footer />
    </div>
  );
};
