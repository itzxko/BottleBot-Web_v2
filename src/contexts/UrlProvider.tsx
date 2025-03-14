import React, { createContext, useContext } from "react";

const UrlContext = createContext<any>(null);

export const UrlProvider = ({ children }: any) => {
  const urlString = "https://bottlebot.onrender.com";

  return (
    <UrlContext.Provider value={{ urlString }}>{children}</UrlContext.Provider>
  );
};

export const useUrl = () => useContext(UrlContext);
