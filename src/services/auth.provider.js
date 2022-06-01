import { useState, useEffect } from "react";
import AuthService from "./auth.service";
import AuthContext from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
