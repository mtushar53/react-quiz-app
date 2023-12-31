import React, { createContext, useState } from "react";

const AuthContext = createContext({});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
