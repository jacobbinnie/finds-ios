import React, { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { Profile } from "@/types/types";

interface SupabaseContextValues {
  currentSession?: Session | null;
  profile: Profile | null;
}

const SupabaseContext = createContext<SupabaseContextValues>({
  profile: null,
});

interface SupabaseProviderOptions {
  children?: React.ReactNode;
}

export const SupabaseProvider = ({ children }: SupabaseProviderOptions) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        supabase
          .from("profile")
          .select("*")
          .single()
          .then(({ data }) => {
            if (!data?.username || !data.id) {
              throw new Error("Profile details not found");
            }
            setProfile({
              id: data.id,
              username: data.username,
              firstname: data.firstname,
              image: data.image,
              created_at: data.created_at,
            });
          });
      } else {
        setProfile(null);
      }
    });
  }, []);

  const value = {
    profile,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};
