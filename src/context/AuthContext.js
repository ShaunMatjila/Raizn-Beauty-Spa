"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getAdminProfile,
  updateLastLogin,
  checkAdminByEmail,
} from "../lib/admin-service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);

  // Firebase Authentication implementation with Firestore profile
  const login = async (email, password) => {
    try {
      console.log("Attempting Firebase login:", { email });

      // First sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("Firebase login successful:", user.email);

      // Now check if user is an admin in Firestore (after authentication)
      const adminData = await checkAdminByEmail(email);
      if (!adminData) {
        // Sign out the user if they're not an admin
        await signOut(auth);
        throw new Error("Access denied. Admin privileges required.");
      }

      // Get the full admin profile from Firestore
      const profile = await getAdminProfile(user.uid);

      if (profile && profile.isActive) {
        setIsAdmin(true);
        setCurrentUser(user);
        setAdminProfile(profile);

        // Update last login time
        await updateLastLogin(user.uid);

        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminEmail", user.email);
        localStorage.setItem("adminProfile", JSON.stringify(profile));

        // Set cookie with proper settings for middleware
        const expires = new Date();
        expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
        document.cookie = `isAdmin=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure=${
          window.location.protocol === "https:"
        }`;

        console.log(
          "Authentication successful, admin profile loaded:",
          profile
        );
        return true;
      } else {
        // Sign out the user if they're not an active admin
        await signOut(auth);
        throw new Error("Admin account is inactive or not found");
      }
    } catch (error) {
      console.error("Firebase login error:", error);
      let errorMessage = "Invalid credentials";

      // Provide more specific error messages
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No admin account found with this email";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later";
          break;
        default:
          errorMessage = error.message || "Login failed";
      }

      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      setCurrentUser(null);
      setAdminProfile(null);
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminProfile");
      // Remove cookie
      document.cookie =
        "isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user?.email || "No user");

      if (user) {
        try {
          // Check if user is an admin and get profile
          const adminData = await checkAdminByEmail(user.email);

          if (adminData && adminData.isActive) {
            // Get full profile
            const profile = await getAdminProfile(user.uid);

            if (profile) {
              setCurrentUser(user);
              setAdminProfile(profile);
              setIsAdmin(true);
              localStorage.setItem("isAdmin", "true");
              localStorage.setItem("adminEmail", user.email);
              localStorage.setItem("adminProfile", JSON.stringify(profile));

              // Set cookie
              const expires = new Date();
              expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
              document.cookie = `isAdmin=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure=${
                window.location.protocol === "https:"
              }`;
            } else {
              // User exists but no profile found - sign them out
              console.log("Admin user found but no profile - signing out");
              await signOut(auth);
              setCurrentUser(null);
              setAdminProfile(null);
              setIsAdmin(false);
            }
          } else {
            // User is not an admin - sign them out
            console.log("User is not an admin - signing out");
            await signOut(auth);
            setCurrentUser(null);
            setAdminProfile(null);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          // Sign out on error to be safe
          await signOut(auth);
          setCurrentUser(null);
          setAdminProfile(null);
          setIsAdmin(false);
        }
      } else {
        // User is signed out
        setCurrentUser(null);
        setAdminProfile(null);
        setIsAdmin(false);
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminProfile");
        document.cookie =
          "isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      }

      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isLoading,
        currentUser,
        adminProfile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
