import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

import { storage } from "@/utils/storage";
import { authApi, usersApi } from "@/types";
import { AuthUserDto } from "@/types/generated";
import {
  useFocusEffect,
  useNavigation,
  usePathname,
  useRouter,
} from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

interface Session {
  accessToken: string;
  refreshToken: string;
  profile: AuthUserDto;
}

interface AuthContextValues {
  session: Session | null | undefined;
  setSession: (session: Session | null) => void;
  isCheckingAuth: boolean;
  signout: () => void;
  checkTokenExpiry: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValues>({
  session: null,
  setSession: () => null,
  isCheckingAuth: false,
  signout: () => null,
  checkTokenExpiry: () => Promise.resolve(),
});

interface AuthProviderOptions {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderOptions) => {
  const [session, setSession] = useState<Session | null | undefined>();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const queryClient = useQueryClient();

  const signout = () => {
    storage.delete("auth");
    setSession(null);
    queryClient.clear();
  };

  const router = useRouter();
  const pathname = usePathname();

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

        try {
          const res = await usersApi.usersControllerGetUser({
            headers: {
              Authorization: `Bearer ${parsed.accessToken}`,
            },
          });

          if (res.data) {
            setSession({
              accessToken: parsed.accessToken,
              refreshToken: parsed.refreshToken,
              profile: res.data,
            });
          } else {
            console.log("Error fetching user data. Resetting auth state...");
            storage.delete("auth");
          }
        } catch (e: any) {
          if (e.response?.status === 404) {
            console.log("User not found. Resetting auth state...");
            signout();
          } else {
            console.log(e);
          }
        }

        setIsCheckingAuth(false);
      }
    } else {
      console.log("No JWT found.");
      setIsCheckingAuth(false);
    }
  };

  const checkTokenExpiry = async () => {
    console.log("Checking again...");
    const storedSession = storage.getString("auth");

    if (storedSession) {
      await checkJwt(storedSession);
    } else {
      setSession(null);
    }
  };

  // Initial check when the component is mounted
  useEffect(() => {
    checkTokenExpiry();
  }, []);

  // Periodic token expiry check (adjust the interval as needed)
  useEffect(() => {
    console.log("Interval started");
    const intervalId = setInterval(() => {
      checkTokenExpiry();
    }, 60000); // Check every minute, adjust as needed

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (session) {
      if (session?.profile.username && session.profile.firstname) {
        if (
          pathname === "/login" ||
          pathname === "/onboarding-username" ||
          pathname === "/onboarding-firstname"
        ) {
          console.log("Redirecting to /");
          router.push("/");
        }
      } else if (!session?.profile.username) {
        if (pathname !== "/onboarding-username") {
          router.push("/onboarding-username");
        }
      } else if (!session?.profile.firstname) {
        if (pathname !== "/onboarding-firstname") {
          router.push("/onboarding-firstname");
        }
      }
    } else {
      if (session === null) {
        if (pathname !== "/login") {
          router.push("/login");
        }
      }
    }
  }, [session]);

  const value = {
    session,
    setSession,
    isCheckingAuth,
    signout,
    checkTokenExpiry,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
