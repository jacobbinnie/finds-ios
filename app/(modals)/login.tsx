import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Auth } from "@/components/Auth.native";
import { useRouter } from "expo-router";
import { Theme } from "@/constants/Styles";
import { useAuth } from "@/providers/AuthProvider";

const Login = () => {
  const { profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      router.back();
    }
  }, [profile]);

  return (
    <View
      style={[
        Theme.Container,
        { justifyContent: "center", alignItems: "center", gap: 10 },
      ]}
    >
      <Auth />
    </View>
  );
};

export default Login;
