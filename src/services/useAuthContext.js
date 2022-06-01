import { useContext } from "react";
import AuthContext from "./auth-context";

export const useAuthContext = () => {
  const user = useContext(AuthContext);

  if (user === undefined) {
    return null;
  }

  return user.user;
};
