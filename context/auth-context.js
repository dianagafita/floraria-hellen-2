"use client";
import { createContext, useState, useEffect, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook for using authentication context
export const useValidUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useValidUser must be used within an AuthProvider");
  }
  return context;
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch authentication data on mount
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await fetch("/api/valid");
        const data = await response.json();
        setUser(data.userId);
      } catch (error) {
        setUser(null);
      }
    };

    fetchAuthData();
  }, [user]); // Empty dependency array to run only once on mount

  // Provide the authentication data to the context
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
