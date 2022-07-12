import { createContext, useContext, useReducer } from "react";
import { LOGIN_STATUS, SIGNUP_STATUS } from "./utilities/authActionTypes";
const AuthContext = createContext();
const useAuthProvider = () => useContext(AuthContext);

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SIGNUP_STATUS:
      return {
        ...state,
        isSignedUp: action.payload,
      };
    default:
      return state;
  }
};
const initialState = {
  isLoggedIn: false,
  isSignedUp: false,
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthProvider };
