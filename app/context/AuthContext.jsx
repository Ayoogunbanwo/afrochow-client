"use client";
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create context outside the provider
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // State to hold authentication data
  const [auth, setAuth] = useState({
    email: null,
    accessToken: null,
    refreshToken: null,
    userProfile: null, // Add userProfile to the state
  });


  
  // Function to log in the user
  const login = async (email, password) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Authentication failed");
      }
      const { accessToken, refreshToken, user } = await response.json();
      setAuth({ email, accessToken, refreshToken, userProfile: user });
      localStorage.setItem(
        "auth",
        JSON.stringify({ email, accessToken, refreshToken, userProfile: user })
      );
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };



  // Function to log out the user
  const logout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      setAuth({ email: null, accessToken: null, refreshToken: null, userProfile: null });
      localStorage.removeItem("auth");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };



  // Load auth data from localStorage on app load (optional)
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        setAuth(JSON.parse(storedAuth));
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the auth context
export function useAuthContext() {
  return useContext(AuthContext);
}
