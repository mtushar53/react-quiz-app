import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { ROLES } from "../utils/Roles";
import { Users } from "../utils/Users";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const isAdmin = auth?.roles.includes(ROLES.Admin);
  return { auth, setAuth, isAdmin };
};

export const getUserNameById = (userId: number) => {
  return Users.find((user) => user.id === userId)?.username;
};

export default useAuth;
