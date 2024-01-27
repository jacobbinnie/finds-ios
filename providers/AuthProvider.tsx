import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

import { Profile } from "@/types/types";
import { storage } from "@/utils/storage";
import { authApi } from "@/types";
import { AuthUserDto } from "@/types/generated";
import { useRouter } from "expo-router";

interface Session {
  accessToken: string;
  refreshToken: string;
  profile: AuthUserDto;
}

interface AuthContextValues {
  session: Session | null;
  setSession: (session: Session | null) => void;
  isCheckingAuth: boolean;
  signout: () => void;
}

const AuthContext = createContext<AuthContextValues>({
  session: null,
  setSession: () => null,
  isCheckingAuth: false,
  signout: () => null,
});

interface AuthProviderOptions {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderOptions) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const signout = () => {
    storage.delete("auth");
    setSession(null);
    router.push("/");
    router.push("/(modals)/login");
  };

  const router = useRouter();

  const refreshAuth = async (refreshToken: string) => {
    const decodedRefreshToken = jwtDecode(refreshToken);
    if (
      decodedRefreshToken.exp &&
      decodedRefreshToken.exp * 1000 < Date.now()
    ) {
      storage.delete("auth");
      return null;
    } else {
      const res: any = await authApi.authControllerRefreshToken({
        data: {
          refresh: refreshToken,
        },
      });

      if (res.data.access_token) {
        return res.data.access_token as string;
      } else {
        return null;
      }
    }
  };

  const checkJwt = async (session: string) => {
    setIsCheckingAuth(true);
    console.log("Checking JWT..");

    const parsed = JSON.parse(session) as Session;
    const decodedJwt = parsed.accessToken
      ? jwtDecode(parsed.accessToken)
      : null;

    if (decodedJwt && decodedJwt.exp) {
      const remainingTime = decodedJwt.exp * 1000 - Date.now();

      if (remainingTime < 0 || remainingTime <= 10000) {
        // Token is expired or about to expire in 5 minutes, refresh it
        console.log(
          "Access token has expired or has 5 minutes remaining. Refreshing token.."
        );
        console.log(parsed.refreshToken);
        const newAccessToken = await refreshAuth(parsed.refreshToken);

        if (newAccessToken) {
          console.log("New access token received. Updating auth state..");
          const newSession = {
            ...parsed,
            accessToken: newAccessToken,
          };

          storage.delete("auth");
          storage.set("auth", JSON.stringify(newSession));

          setSession(newSession);

          setIsCheckingAuth(false);
        } else {
          // Refresh token is expired, delete auth data
          console.log("Refresh token is expired. Deleting auth data..");
          storage.delete("auth");
          setIsCheckingAuth(false);
        }
      } else {
        // Token is still valid, use the existing one
        console.log(
          `Access token is still valid. Updating auth state... Remaining time is ${remainingTime}ms`
        );
        setSession(parsed);
        setIsCheckingAuth(false);
      }
    } else {
      console.log("No JWT found.");
      setIsCheckingAuth(false);
    }
  };

  useMemo(() => {
    const session = storage.getString("auth");

    if (session) {
      checkJwt(session);
    }
  }, []);

  useEffect(() => {
    if (session?.profile) {
      if (session?.profile?.username) {
        router.push("/");
      } else {
        router.push("/(modals)/onboarding");
      }
    }
  }, [session]);

  const value = {
    session,
    setSession,
    isCheckingAuth,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
