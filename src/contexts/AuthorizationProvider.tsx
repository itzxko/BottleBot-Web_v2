import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthorizationContext = createContext<any>(null);

export const AuthorizationProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const getCredentials = () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currentUser = JSON.parse(user);
      if (currentUser) {
        if (currentUser.credentials.level === "staff") {
          navigate("/staff/dashboard");
        } else if (currentUser.credentials.level === "admin") {
          navigate("/admin/dashboard");
        }
      }
    } else {
      navigate("/");
    }
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    getCredentials();
  }, []);

  return (
    <AuthorizationContext.Provider value={{ onLogout }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorization = () => useContext(AuthorizationContext);
