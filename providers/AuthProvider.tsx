import React, { createContext, useContext, useState } from "react";

import { Session } from "@supabase/supabase-js";
import { Profile } from "@/types/types";

interface AuthContextValues {
  currentSession?: Session | null;
  profile: Profile | null;
}

const AuthContext = createContext<AuthContextValues>({
  profile: null,
});

interface AuthProviderOptions {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderOptions) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     if (session?.user) {
  //       supabase
  //         .from("profile")
  //         .select("*")
  //         .single()
  //         .then(({ data }) => {
  //           if (!data?.username || !data.id) {
  //             throw new Error("Profile details not found");
  //           }
  //           setProfile({
  //             id: data.id,
  //             username: data.username,
  //             firstname: data.firstname,
  //             image: data.image,
  //             created_at: data.created_at,
  //           });
  //         });
  //     } else {
  //       setProfile(null);
  //     }
  //   });
  // }, []);

  const value = {
    profile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
