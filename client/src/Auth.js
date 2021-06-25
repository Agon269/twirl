import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";
import twirl from "./api/twirl";
import Loading from "./components/Loading";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  let cookie = Cookies.get("user");

  const auth = async (token) => {
    Cookies.set("user", token);
    const { data } = await twirl.get("user/currentuser", {
      headers: { user: token },
    });
    setUser(data);
    setLoading(false);
  };

  const logOut = async () => {
    Cookies.remove("user");
    // await twirl.get("user/signout");
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
    return <Loading />;
  }
  return (
    <AuthContext.Provider
      value={{ ...user, onAuthChange: auth, logOut: logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
