
"use client";

import type { User } from 'firebase/auth';
import { auth, googleAuthProvider } from '@/lib/firebase/config';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loadingAuth: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoadingAuth(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      // User state will be updated by onAuthStateChanged listener
      toast({ title: "Signed In!", description: "Welcome back." });
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      toast({ title: "Sign In Failed", description: error.message || "Could not sign in with Google.", variant: "destructive" });
      setLoadingAuth(false);
    }
  };

  const signOutUser = async () => {
    setLoadingAuth(true);
    try {
      await signOut(auth);
      // User state will be updated by onAuthStateChanged listener
      toast({ title: "Signed Out", description: "You have been signed out." });
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({ title: "Sign Out Failed", description: error.message || "Could not sign out.", variant: "destructive" });
    } finally {
      // Ensure loadingAuth is set to false even if onAuthStateChanged is slow
      // or if there's an error before it fires for the null user.
      // This helps prevent UI from staying in loading state indefinitely on sign out.
      setUser(null); 
      setLoadingAuth(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loadingAuth, signInWithGoogle, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
