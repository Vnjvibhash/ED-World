"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";
import { hashPassword, verifyPassword } from "@/lib/crypto";

// ─── User Profile Type ────────────────────────────────────────────────────────

export type UserRole = "admin" | "student" | "teacher";

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: UserRole;
  membership: "bronze" | "silver" | "gold" | "premium";
  hasPasswordSet?: boolean;
  passwordHash?: string;
  passwordSalt?: string;
  createdAt?: unknown;
  lastLoginAt?: unknown;
  passwordSetAt?: unknown;
  provider: string;
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isPasswordModalOpen: boolean;
  openPasswordModal: () => void;
  closePasswordModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (
    email: string,
    password: string,
    role?: UserRole
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  savePasswordHash: (
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isAuthenticated: false,
  isPasswordModalOpen: false,
  openPasswordModal: () => {},
  closePasswordModal: () => {},
  signInWithGoogle: async () => {},
  signInWithEmail: async () => ({ success: false }),
  logout: async () => {},
  savePasswordHash: async () => ({ success: false }),
});

export const useAuth = () => useContext(AuthContext);

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function checkIsAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const lower = email.toLowerCase().trim();
  return (
    lower === "admin@studentworld.edu" ||
    lower === "vivek@studentworld.edu" ||
    lower === "vivekajee@gmail.com" ||
    lower.startsWith("admin@")
  );
}

export function formatDisplayNameFromEmail(email?: string | null): string {
  if (!email) return "User";
  const lower = email.toLowerCase().trim();
  if (lower === "admin@studentworld.edu" || lower.startsWith("admin@")) {
    return "Admin";
  }
  const namePart = email.split("@")[0];
  return namePart
    .replace(/[._\-+]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  // Compute if current session is authenticated
  const isAuthenticated = Boolean(user || profile);

  // Compute if current user is an authentic Admin
  const isAdmin = Boolean(
    profile?.role === "admin" ||
      checkIsAdminEmail(profile?.email) ||
      checkIsAdminEmail(user?.email)
  );

  /** Synchronize User to Firestore and determine if password setup is required */
  const handleUserSync = useCallback(
    async (firebaseUser: User, providerOverride?: string) => {
      try {
        const email = firebaseUser.email?.toLowerCase().trim() || "";
        const isEligibleAdmin = checkIsAdminEmail(email);

        // Check if document exists by UID or by email
        let userDocRef = doc(db, "users", firebaseUser.uid);
        let snap = await getDoc(userDocRef);

        if (email) {
          try {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnap = await getDocs(q);
            if (!querySnap.empty) {
              const bestDoc =
                querySnap.docs.find(
                  (d) =>
                    d.data().displayName &&
                    d.data().displayName !== "Platform Administrator"
                ) || querySnap.docs[0];
              snap = bestDoc;
              userDocRef = doc(db, "users", bestDoc.id);
            }
          } catch (queryErr) {
            console.warn("User query by email warning:", queryErr);
          }
        }

        const existingData = snap.exists() ? (snap.data() as Partial<UserProfile>) : {};
        const resolvedRole: UserRole =
          existingData.role || (isEligibleAdmin ? "admin" : "student");
        const rawDisplayName =
          firebaseUser.displayName || existingData.displayName;
        const resolvedDisplayName =
          rawDisplayName && rawDisplayName !== "Platform Administrator"
            ? rawDisplayName
            : formatDisplayNameFromEmail(email);
        const resolvedPhotoURL =
          firebaseUser.photoURL || existingData.photoURL || null;
        const resolvedProvider =
          providerOverride ||
          existingData.provider ||
          (firebaseUser.providerData[0]?.providerId === "password"
            ? "password"
            : "google");

        const profileData: UserProfile = {
          uid: snap.exists() ? userDocRef.id : firebaseUser.uid,
          displayName: resolvedDisplayName,
          email: email || existingData.email || null,
          photoURL: resolvedPhotoURL,
          role: resolvedRole,
          membership:
            resolvedRole === "admin"
              ? "premium"
              : existingData.membership || "bronze",
          hasPasswordSet: Boolean(
            existingData.hasPasswordSet || existingData.passwordHash
          ),
          passwordHash: existingData.passwordHash,
          passwordSalt: existingData.passwordSalt,
          lastLoginAt: serverTimestamp(),
          createdAt: existingData.createdAt || serverTimestamp(),
          provider: resolvedProvider,
        };

        await setDoc(
          userDocRef,
          {
            displayName: profileData.displayName,
            email: profileData.email,
            photoURL: profileData.photoURL,
            role: profileData.role,
            membership: profileData.membership,
            lastLoginAt: profileData.lastLoginAt,
            provider: profileData.provider,
            ...(existingData.createdAt ? {} : { createdAt: profileData.createdAt }),
          },
          { merge: true }
        );

        setProfile(profileData);

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "sw_active_session",
            JSON.stringify({
              uid: profileData.uid,
              displayName: profileData.displayName,
              email: profileData.email,
              photoURL: profileData.photoURL,
              role: profileData.role,
              membership: profileData.membership,
              provider: profileData.provider,
              hasPasswordSet: profileData.hasPasswordSet,
            })
          );
        }

        // Only open password modal if provider is Google AND user hasn't set a password yet
        if (
          resolvedProvider === "google" &&
          !existingData.hasPasswordSet &&
          !existingData.passwordHash
        ) {
          setIsPasswordModalOpen(true);
        }
      } catch (err) {
        console.error("Firestore user sync error:", err);
      }
    },
    []
  );

  // Listen to Firebase Auth State & load active session
  useEffect(() => {
    // Restore session immediately to avoid layout flash
    if (typeof window !== "undefined") {
      try {
        const savedSession = localStorage.getItem("sw_active_session");
        if (savedSession) {
          const parsed = JSON.parse(savedSession) as UserProfile;
          setProfile(parsed);
          setLoading(false);
        }
      } catch (e) {
        console.warn("Session restore error:", e);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        await handleUserSync(firebaseUser);
      } else {
        // If not logged in via Firebase Auth, keep profile only if active session exists
        if (typeof window !== "undefined" && !localStorage.getItem("sw_active_session")) {
          setProfile(null);
        }
        setIsPasswordModalOpen(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [handleUserSync]);

  /** Google Sign In with Popup */
  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await handleUserSync(result.user, "google");
      }
    } catch (error: unknown) {
      console.error("Google Sign-In failed:", error);
    } finally {
      setLoading(false);
    }
  }, [handleUserSync]);

  /** Email and Password Authentication */
  const signInWithEmail = useCallback(
    async (
      emailInput: string,
      passwordInput: string,
      selectedRole: UserRole = "student"
    ): Promise<{ success: boolean; error?: string }> => {
      const email = emailInput.trim().toLowerCase();
      if (!email || !passwordInput) {
        return { success: false, error: "Please provide an email and password" };
      }

      setLoading(true);

      const isEligibleAdmin = checkIsAdminEmail(email) || selectedRole === "admin";
      const determinedRole: UserRole = isEligibleAdmin ? "admin" : selectedRole;

      try {
        // 1. Check if the email exists in Firestore
        const usersCol = collection(db, "users");
        const q = query(usersCol, where("email", "==", email));
        const querySnap = await getDocs(q);

        if (querySnap.empty) {
          // If the account does not exist in Firestore, do NOT create another user!
          setLoading(false);
          return {
            success: false,
            error:
              "No account found with this email. Please sign in with Google or create an account.",
          };
        }

        // Email exists in database! Pick the existing user document.
        const userDoc = querySnap.docs[0];
        const existingData = userDoc.data() as Partial<UserProfile>;
        const userDocRef = doc(db, "users", userDoc.id);

        // 2. Check if password is set on this existing account
        const hasPassword = Boolean(
          existingData.hasPasswordSet &&
            existingData.passwordHash &&
            existingData.passwordSalt
        );

        if (!hasPassword) {
          setLoading(false);
          return {
            success: false,
            error:
              "No password has been set for this account yet. Please sign in with Google first to configure your security password.",
          };
        }

        // 3. Verify the entered password against the stored salt & hash
        const isPasswordValid = await verifyPassword(
          passwordInput,
          existingData.passwordSalt!,
          existingData.passwordHash!
        );

        if (!isPasswordValid) {
          setLoading(false);
          return {
            success: false,
            error: "Incorrect password. Please verify your credentials and try again.",
          };
        }

        // 4. Password verified! DO NOT create another user document.
        // Update last login timestamp and resolved role on the existing document.
        const roleToUse: UserRole = existingData.role || determinedRole;
        const displayNameToUse =
          existingData.displayName &&
          existingData.displayName !== "Platform Administrator"
            ? existingData.displayName
            : formatDisplayNameFromEmail(email);

        await setDoc(
          userDocRef,
          {
            lastLoginAt: serverTimestamp(),
            role: roleToUse,
            displayName: displayNameToUse,
          },
          { merge: true }
        );

        const authenticatedProfile: UserProfile = {
          ...existingData,
          uid: userDoc.id,
          email,
          displayName: displayNameToUse,
          photoURL: existingData.photoURL || null,
          role: roleToUse,
          membership:
            roleToUse === "admin"
              ? "premium"
              : existingData.membership || "bronze",
          hasPasswordSet: true,
          provider: existingData.provider || "password",
        } as UserProfile;

        // Persist session to local storage for immediate cross-page recognition
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "sw_active_session",
            JSON.stringify({
              uid: authenticatedProfile.uid,
              email: authenticatedProfile.email,
              displayName: authenticatedProfile.displayName,
              role: authenticatedProfile.role,
              membership: authenticatedProfile.membership,
              photoURL: authenticatedProfile.photoURL,
              provider: authenticatedProfile.provider,
              hasPasswordSet: true,
            })
          );
        }

        // Optional Firebase Auth sign in if user credentials exist in Auth, but never fail or create duplicate
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            passwordInput
          );
          if (userCredential.user) {
            setUser(userCredential.user);
          }
        } catch {
          // Firebase Auth credentials might not be configured; Firestore verification is sufficient
        }

        setProfile(authenticatedProfile);
        setLoading(false);
        return { success: true };
      } catch (err: unknown) {
        console.error("signInWithEmail error:", err);
        setLoading(false);
        return {
          success: false,
          error:
            (err as Error)?.message ||
            "Failed to sign in. Please check your credentials.",
        };
      }
    },
    []
  );

  /** Save Hashed Password to Firestore */
  const savePasswordHash = useCallback(
    async (password: string): Promise<{ success: boolean; error?: string }> => {
      const activeUid = user?.uid || profile?.uid;
      if (!activeUid) {
        return { success: false, error: "No authenticated user found" };
      }

      try {
        const { hash, salt } = await hashPassword(password);

        const userRef = doc(db, "users", activeUid);
        const updatePayload = {
          passwordHash: hash,
          passwordSalt: salt,
          hasPasswordSet: true,
          passwordSetAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(userRef, updatePayload, { merge: true });

        setProfile((prev) =>
          prev
            ? {
                ...prev,
                hasPasswordSet: true,
                passwordHash: hash,
                passwordSalt: salt,
              }
            : null
        );

        return { success: true };
      } catch (error) {
        console.error("Error saving password hash to Firestore:", error);
        return {
          success: false,
          error:
            error instanceof Error ? error.message : "Failed to save password",
        };
      }
    },
    [user, profile]
  );

  /** Sign out */
  const logout = useCallback(async () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("sw_active_session");
      }
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out failed:", error);
    } finally {
      setUser(null);
      setProfile(null);
      setIsPasswordModalOpen(false);
      if (typeof window !== "undefined") {
        localStorage.removeItem("sw_active_session");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        isAuthenticated,
        isPasswordModalOpen,
        openPasswordModal,
        closePasswordModal,
        signInWithGoogle,
        signInWithEmail,
        logout,
        savePasswordHash,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
