import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";
import twirl from "./api/twirl";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  let cookie = Cookies.get("jwt");

  const auth = async () => {
    const { data } = await twirl.get("user/currentuser");
    setUser(data);
    setLoading(false);
  };

  const logOut = async () => {
    await twirl.get("user/signout");
  };

  useEffect(() => {
    const authenticate = async () => {
      const { data } = await twirl.get("user/currentuser", {
        headers: { user: cookie },
      });
      setUser(data);
      setLoading(false);
    };
    authenticate();
  }, [cookie]);

  if (loading) {
    return <h1>Loading ..</h1>;
  }
  return (
    <AuthContext.Provider
      value={{ ...user, onAuthChange: auth, logOut: logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
