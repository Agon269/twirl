import React, { useContext } from "react";

import { AuthContext } from "../Auth";

export default function Signout() {
  const { onAuthChange, logOut } = useContext(AuthContext);

  const handleClick = () => {
    logOut();
    onAuthChange();
  };

  return <span onClick={handleClick}>Sign out</span>;
}
