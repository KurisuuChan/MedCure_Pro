// src/hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const currentSession = await authService.getSession();
        setSession(currentSession);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const subscription = authService.onAuthStateChange(setSession);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    login: authService.signInWithPassword,
    logout: authService.signOut,
    loading,
  };

  // ... inside useAuth.js
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
