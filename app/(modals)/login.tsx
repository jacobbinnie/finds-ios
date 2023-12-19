import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Auth } from "@/components/Auth.native";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useRouter } from "expo-router";
import { Theme } from "@/constants/Styles";

const Login = () => {
  const { profile } = useSupabase();
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
