import React, { useEffect } from "react";
import { Tabs, useRouter, useSegments } from "expo-router";
import Colors from "@/constants/Colors";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSupabase } from "@/providers/SupabaseProvider";

const Layout = () => {
  const segments = useSegments();
  const { profile } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (!profile && segments[1] === "(auth)") {
      router.push("/");
    }
  }, [segments[1], profile]);

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
        name="(auth)/finds"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={30} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (!profile) {
              router.push("/(modals)/login");
            } else {
              router.push("/finds");
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
            if (!profile) {
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
