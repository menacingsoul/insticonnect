import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// Define the context and its initial value
interface AuthContextValue {
  user: any; // Define the type for user appropriately
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode; // Define the type for children
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Function to load user data from cookies
    const loadUserData = () => {
      try {
        const storedUser = Cookies.get("user");
        if (storedUser) {
          return JSON.parse(storedUser);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
      return null;
    };

    // Function to check if the user is authenticated
    const isAuthenticated = () => {
      return user !== null;
    };

    // Load user data when the component mounts
    const userData = loadUserData();
    if (userData) {
      setUser(userData);
    }
  }, []); // Add user dependency if needed

  // Function to sign in the user
  const signIn = async ({ email, password }) => {
    try {
      // Make a POST request to your login endpoint
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      // Save tokens to cookies
      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);

      // Get user info
      const userData = response.data.user;
      setUser(userData);

      // Save user data to cookies
      Cookies.set("user", JSON.stringify(userData));

      // Redirect to the dashboard or another protected route
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Function to sign out the user
  const signOut = async () => {
    try {
      // Clear cookies and user data
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("user");
      setUser(null);

      // Redirect to the login page or another route
      router.push("/auth/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
