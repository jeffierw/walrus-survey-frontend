import React, { createContext, useContext, useState } from 'react';

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [loginbox, setLoginbox] = useState(false);

  const openLoginbox = () => setLoginbox(true);
  const closeLoginbox = () => setLoginbox(false);

  const toggleLoginbox = () => {
    setLoginbox(prev => !prev);
  };

  return (
    <NavbarContext.Provider value={{ loginbox, openLoginbox, closeLoginbox, toggleLoginbox }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);