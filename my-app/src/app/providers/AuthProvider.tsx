"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { isAdmin } from '@/app/lib/supabase';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isUserAdmin: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isUserAdmin: false,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  
  // Create a Supabase client that uses cookies
  const supabase = createClientComponentClient();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          
          const adminStatus = await isAdmin(session.user.id);
          setIsUserAdmin(adminStatus);
        }
      } catch (error) {
        console.error('Error fetching auth user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const adminStatus = await isAdmin(session.user.id);
          setIsUserAdmin(adminStatus);
        } else {
          setUser(null);
          setIsUserAdmin(false);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsUserAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isUserAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
} 