import { Theme } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import "react-native-url-polyfill/auto";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "font-b": require("../assets/fonts/Gilroy-Bold.ttf"),
    "font-s": require("../assets/fonts/Gilroy-SemiBold.ttf"),
    "font-mi": require("../assets/fonts/Gilroy-MediumItalic.ttf"),
    "font-m": require("../assets/fonts/Gilroy-Medium.ttf"),
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
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: "modal",
          title: "Sign in",
          headerTitleStyle: Theme.Title,
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Ionicons name="close-outline" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/search"
        options={{
          presentation: "modal",
          title: "Search",
          headerTitleStyle: Theme.Title,
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="profile/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="place/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="find-details/[id]"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="new-find/[id]"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
