import { createContext, useContext, useReducer } from "react";
import { loginStatus, signupStatus } from "./utilities/authActionTypes";
const AuthContext = createContext();
const useAuthProvider = () => useContext(AuthContext);

const authReducer = (state, action) => {
  switch (action.type) {
    case loginStatus:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case signupStatus:
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
