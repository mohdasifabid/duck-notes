import { act } from "@testing-library/react";
import { createContext, useContext, useReducer } from "react";
import {
  archivedNotes,
  getNotes,
  getTrash,
  searchedNote,
} from "./utilities/noteActionTypes";
const NoteContext = createContext();
const useNote = () => useContext(NoteContext);

const noteReducer = (state, action) => {
  switch (action.type) {
    case getNotes:
      return {
        ...state,
        notes: action.payload,
      };
    case archivedNotes:
      return {
        ...state,
        archive: action.payload,
      };
    case searchedNote:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case getTrash:
      return {
        ...state,
        trash: action.payload,
      };
    default:
      return state;
  }
};
const initialState = {
  notes: [],
  archive: [],
  searchQuery: "",
  trash: [],
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
