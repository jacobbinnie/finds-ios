import React, { createContext, useContext, useEffect, useState } from "react";

import { Profile } from "@/types/types";

interface Session {
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}

interface AuthContextValues {
  session: Session | null;
  setSession: (session: Session) => void;
}

const AuthContext = createContext<AuthContextValues>({
  session: null,
  setSession: () => null,
});

interface AuthProviderOptions {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderOptions) => {
  const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  // Add your authentication logic here using supabase.auth.onAuthStateChange
  // Example:
  // const supabase = createClient("your-supabase-url", "your-supabase-key");
  // const authListener = supabase.auth.onAuthStateChange((_event, session) => {
  //   setSession(session);
  // });
  // Cleanup the listener when component unmounts
  // return () => {
  //   authListener.unsubscribe();
  // };
  // }, []);

  const value = {
    session,
    setSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
