import React, { useEffect } from "react";
import { Link, Tabs, useRouter, useSegments } from "expo-router";
import Colors from "@/constants/Colors";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useNavigation } from "expo-router";

const Layout = () => {
  const segments = useSegments();
  const { profile } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (!profile && segments[1] === "(auth)") {
      router.push("/(modals)/login");
    }
  }, [segments[1]]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grey,
        tabBarLabelStyle: {
          fontFamily: "font-s",
        },
      }}
    >
      <Tabs.Screen
        name="(public)/index"
        options={{
          headerShown: false,
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(auth)/finds"
        options={{
          tabBarLabel: "Finds",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(auth)/post"
        options={{
          tabBarLabel: "Post",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(auth)/profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
