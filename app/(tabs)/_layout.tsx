import React, { useEffect } from "react";
import { Tabs, useRouter, useSegments } from "expo-router";
import Colors from "@/constants/Colors";

import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(auth)/search/search"
        options={{
          headerShown: false,
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (!session) {
              router.push("/(modals)/login");
            } else {
              router.push("/search/search");
            }
          },
        }}
      />
      <Tabs.Screen
        name="(auth)/new-find"
        options={{
          headerShown: false,
          tabBarLabel: "New Find",
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-square" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (!session) {
              router.push("/(modals)/login");
            } else {
              router.push("/new-find");
            }
          },
        }}
      />
      <Tabs.Screen
        name="(auth)/saves"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
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
        name="(auth)/my-profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (!session) {
              router.push("/(modals)/login");
            } else {
              router.push("/my-profile");
            }
          },
        }}
      />
    </Tabs>
  );
};

export default Layout;
