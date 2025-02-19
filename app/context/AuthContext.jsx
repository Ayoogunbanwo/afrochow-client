"use client"; 

import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    email: null,
    accessToken: null,
    refreshToken: null,
    userProfile: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        setAuth(JSON.parse(storedAuth));
      }
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const router = useRouter();
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        signal: controller.signal,
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Logout request timed out");
      } else {
        console.error("Logout error:", error);
      }
    } finally {
      clearTimeout(timeoutId);
      setAuth({ email: null, accessToken: null, refreshToken: null, userProfile: null });
      localStorage.removeItem("auth");
      setLoading(false);

      // Ensure router is ready before pushing
      if (router.isReady) {
        router.push("/customer");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuthContext() {
  return useContext(AuthContext);
}