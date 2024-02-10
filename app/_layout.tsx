import { Theme } from "@/constants/Styles";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-url-polyfill/auto";
import { RootSiblingParent } from "react-native-root-siblings";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(modals)/loading",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "font-b": require("../assets/fonts/Gilroy-Bold.ttf"),
    "font-s": require("../assets/fonts/Gilroy-SemiBold.ttf"),
    "font-mi": require("../assets/fonts/Gilroy-MediumItalic.ttf"),
    "font-m": require("../assets/fonts/Gilroy-Medium.ttf"),
    "font-serif": require("../assets/fonts/HVAnalogueBold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RootSiblingParent>
          <RootLayoutNav />
        </RootSiblingParent>
      </QueryClientProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/onboarding-username"
        options={{
          presentation: "fullScreenModal",
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/onboarding-firstname"
        options={{
          presentation: "fullScreenModal",
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen name="profile/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="place/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="find-details/[id]"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen name="new-find/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/sharing/[id]"
        options={{
          presentation: "modal",
          headerTitle: "Share find",
          headerTitleStyle: Theme.Title,
          headerBackTitle: "Back",
          headerBackTitleStyle: Theme.Caption,
        }}
      />
    </Stack>
  );
}
