import React, { useEffect } from "react";
import { Tabs, useRouter, useSegments } from "expo-router";
import Colors from "@/constants/Colors";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";

const Layout = () => {
  const segments = useSegments();
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session && segments[1] === "(auth)") {
      router.push("/");
    }
  }, [segments[1], session]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark,
        tabBarInactiveTintColor: Colors.grey,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="(public)/index"
        options={{
          headerShown: false,
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(auth)/saves"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={30} color={color} />
          ),
          headerShown: false,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (!session) {
              router.push("/(modals)/login");
            } else {
              router.push("/saves");
            }
          },
        }}
      />
      <Tabs.Screen
        name="(auth)/profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (!session) {
              router.push("/(modals)/login");
            } else {
              router.push("/profile");
            }
          },
        }}
      />
    </Tabs>
  );
};

export default Layout;
