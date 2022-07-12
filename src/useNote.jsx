import { act } from "@testing-library/react";
import { createContext, useContext, useReducer } from "react";
import {
  ARCHIVED_NOTES,
  GET_NOTES,
  GET_TRASH,
  NEED_SEARCH_INPUT_STATUS,
  PINNED_NOTES,
  SEARCHED_NOTE,
} from "./utilities/noteActionTypes";
const NoteContext = createContext();
const useNote = () => useContext(NoteContext);

const noteReducer = (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
   
    case ARCHIVED_NOTES:
      return {
        ...state,
        archive: action.payload,
      };
    case SEARCHED_NOTE:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case GET_TRASH:
      return {
        ...state,
        trash: action.payload,
      };
    case PINNED_NOTES:
      return {
        ...state,
        pinned: [ ...state.pinned, action.payload],
      };
    case NEED_SEARCH_INPUT_STATUS:
      return {
        ...state,
        needSearchInput: action.payload,
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
  pinned: [],
  needSearchInput: false,
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
