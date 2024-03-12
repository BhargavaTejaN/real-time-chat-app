/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    return JSON.parse(localStorage.getItem("chat-user")) || null;
  });

  //console.log("authUser in authContext : ",authUser);

  const value = { authUser, setAuthUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
