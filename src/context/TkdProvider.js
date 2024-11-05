import React, { useState, useEffect } from "react";
import TkContext from "./TkdContext";

export const TkdProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicialize como null para armazenar um objeto de usuário

  const loadUserFromStorage = () => {
    const savedUser = localStorage.getItem("user");
    console.log("savedUser", savedUser);
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Atualiza o estado com o objeto de usuário
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <TkContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </TkContext.Provider>
  );
};
