import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("/images/chicken.png");

  return (
    <UserContext.Provider value={{ username, setUsername, avatarSrc, setAvatarSrc }}>
      {children}
    </UserContext.Provider>
  );
};
