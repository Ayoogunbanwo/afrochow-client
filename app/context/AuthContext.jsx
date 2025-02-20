"use client";

import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    email: null,
    accessToken: null,
    refreshToken: null,
    userProfile: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add isAuthenticated state
  const router = useRouter();

  // Load auth data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        try {
          const authData = JSON.parse(storedAuth);
          setAuth(authData);
          setIsAuthenticated(Boolean(authData.accessToken)); // Check if the user is authenticated
        } catch (error) {
          console.error("Failed to parse auth data from localStorage:", error);
        }
      }
    }
  }, []);

  // Update localStorage when auth state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);  // Reset previous error
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      const data = await response.json();
      
      // Update auth context with user data
      setAuth({
        email: data.user.email, // Correctly access the email from the 'user' object
        accessToken: data.access_token, // Use 'access_token' from the root of the response
        refreshToken: data.refresh_token, // Use 'refresh_token' from the root of the response
        userProfile: data.user, // Use the entire 'user' object as the user profile
      });
      setIsAuthenticated(true); // Set authentication status to true
  
      router.push("/restaurant"); // Redirect after login
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);  // Set error for UI feedback
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    if (auth.accessToken) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.accessToken}` },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    setAuth({ email: null, accessToken: null, refreshToken: null, userProfile: null });
    setIsAuthenticated(false); // Set authentication status to false
    localStorage.removeItem("auth");
    router.push("/customer");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use AuthContext
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
