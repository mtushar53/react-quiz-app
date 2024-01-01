import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}
interface IContext {
  auth: {
    id: number;
    username: string;
    roles: string[];
  };
  setAuth: React.Dispatch<React.SetStateAction<string>>;
}

const initialState = {
  auth: JSON.parse(localStorage.getItem("auth")),
  setAuth: () => {},
};

const AuthContext = createContext<IContext>(initialState);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
