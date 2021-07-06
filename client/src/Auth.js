import React, { useState, useEffect } from "react";

import Cookies from "universal-cookie";
import twirl from "./api/twirl";
import Loading from "./components/Loading";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const [coo, setCoo] = useState(cookies.get("user"));

  const auth = async (token) => {
    cookies.set("user", token);
    setCoo(token);
    const { data } = await twirl.get("user/currentuser", {
      headers: { user: token },
    });
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    const authenticate = async () => {
      const { data } = await twirl.get("user/currentuser", {
        headers: { user: coo },
      });

      setUser(data);
      setLoading(false);
    };
    authenticate();
  }, [coo]);

  const logOut = async () => {
    cookies.remove("user");
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider
      value={{ ...user, onAuthChange: auth, logOut: logOut, token: coo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
