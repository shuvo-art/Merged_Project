import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
    email: null,
    id: null,
  });
  const [otpEmail, setOtpEmail] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved auth data on refresh
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  const login = (userData) => {
    setAuth(userData);
    localStorage.setItem("auth", JSON.stringify(userData));
    navigate("/"); // Redirect to home page after login
  };

  const logout = () => {
    setAuth({ token: null, role: null, email: null, id: null });
    localStorage.removeItem("auth");
    navigate("/auth/signin");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, otpEmail, setOtpEmail}}>
      {children}
    </AuthContext.Provider>
  );
};
