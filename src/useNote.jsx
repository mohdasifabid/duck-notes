import { act } from "@testing-library/react";
import { createContext, useContext, useReducer } from "react";
const NoteContext = createContext();
const useNote = () => useContext(NoteContext);

const noteReducer = (state, action) => {
  switch (action.type) {
    case "GET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "ARCHIVED_NOTES":
      return {
        ...state,
        archive: action.payload,
      };
    case "SEARCH_NOTE":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "PIN_NOTE":
      return {
        ...state,
        pinnedNotes: [...state.pinnedNotes, action.payload],
      };
    default:
      return state;
  }
};
const initialState = {
  notes: [],
  pinnedNotes: [],
  archive: [],
  searchQuery: "",
};
const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteProvider, useNote };
