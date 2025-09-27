// lib/admin-service.js
import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const ADMIN_COLLECTION = "admins";

// Create or update admin profile in Firestore
export const createAdminProfile = async (userId, adminData) => {
  try {
    if (!db) {
      throw new Error('Firebase is not configured');
    }
    
    const adminRef = doc(db, ADMIN_COLLECTION, userId);

    const profileData = {
      uid: userId,
      email: adminData.email,
      firstName: adminData.firstName || "",
      lastName: adminData.lastName || "",
      displayName:
        adminData.displayName ||
        `${adminData.firstName || ""} ${adminData.lastName || ""}`.trim(),
      role: adminData.role || "admin",
      permissions: adminData.permissions || ["read", "write", "manage"],
      isActive: adminData.isActive !== undefined ? adminData.isActive : true,
      createdAt: adminData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: adminData.lastLogin || null,
      profileImage: adminData.profileImage || null,
      phone: adminData.phone || "",
      department: adminData.department || "Management",
    };

    await setDoc(adminRef, profileData, { merge: true });
    console.log("Admin profile created/updated:", profileData);
    return profileData;
  } catch (error) {
    console.error("Error creating admin profile:", error);
    throw new Error("Failed to create admin profile");
  }
};

// Get admin profile by user ID
export const getAdminProfile = async (userId) => {
  try {
    if (!db) {
      throw new Error('Firebase is not configured');
    }
    
    const adminRef = doc(db, ADMIN_COLLECTION, userId);
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists()) {
      const profile = adminSnap.data();
      console.log("Admin profile retrieved:", profile);
      return profile;
    } else {
      console.log("No admin profile found for user:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    throw new Error("Failed to fetch admin profile");
  }
};

// Update admin profile
export const updateAdminProfile = async (userId, updates) => {
  try {
    const adminRef = doc(db, ADMIN_COLLECTION, userId);

    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(adminRef, updateData);
    console.log("Admin profile updated:", updateData);
    return updateData;
  } catch (error) {
    console.error("Error updating admin profile:", error);
    throw new Error("Failed to update admin profile");
  }
};

// Update last login time
export const updateLastLogin = async (userId) => {
  try {
    const adminRef = doc(db, ADMIN_COLLECTION, userId);
    await updateDoc(adminRef, {
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating last login:", error);
    // Don't throw error for last login update failure
  }
};

// Check if user is admin by email
export const checkAdminByEmail = async (email) => {
  try {
    if (!db) {
      throw new Error('Firebase is not configured');
    }
    
    const adminsRef = collection(db, ADMIN_COLLECTION);
    const q = query(
      adminsRef,
      where("email", "==", email),
      where("isActive", "==", true)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const adminDoc = querySnapshot.docs[0];
      return adminDoc.data();
    }

    return null;
  } catch (error) {
    console.error("Error checking admin status:", error);
    throw new Error("Failed to verify admin status");
  }
};

// Get all active admins (for admin management)
export const getAllAdmins = async () => {
  try {
    const adminsRef = collection(db, ADMIN_COLLECTION);
    const q = query(adminsRef, where("isActive", "==", true));

    const querySnapshot = await getDocs(q);
    const admins = [];

    querySnapshot.forEach((doc) => {
      admins.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return admins;
  } catch (error) {
    console.error("Error fetching all admins:", error);
    throw new Error("Failed to fetch admin list");
  }
};
