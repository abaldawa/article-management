/**
 * @author Abhijit Baldawa
 */

import React, { createContext, useContext } from "react";
import * as authLocalStorage from "./local-storage";
import { Analyst } from "../types/analyst";

type AuthContextType = {
  auth?: {
    accessToken: string;
    user: Analyst;
  };
  logout: () => void;
  setAuthDetails: (accessToken: string, user: Analyst) => void;
};

const getAuthDetails = (): AuthContextType["auth"] => {
  const accessToken = authLocalStorage.getItem("auth:token");
  const user = authLocalStorage.getItem("auth:user");

  if (accessToken && user) {
    return { accessToken, user: JSON.parse(user) as Analyst };
  }
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = React.useState<AuthContextType["auth"]>(() =>
    getAuthDetails()
  );

  const setAuthDetails = (accessToken: string, user: Analyst) => {
    authLocalStorage.setItem("auth:token", accessToken);
    authLocalStorage.setItem("auth:user", JSON.stringify(user));

    setAuth({ accessToken, user });
  };

  const logout = () => {
    authLocalStorage.removeItem("auth:token");
    authLocalStorage.removeItem("auth:user");

    setAuth(undefined);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuthDetails, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthContextProvider };
