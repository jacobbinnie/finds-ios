import { View, Text } from "react-native";
import React from "react";
import { Theme } from "@/constants/Styles";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useRouter } from "expo-router";

const Finds = () => {
  const { profile } = useSupabase();
  const router = useRouter();

  if (!profile) {
    return null;
  }

  return (
    <View style={Theme.Container}>
      <Text>Finds</Text>
    </View>
  );
};

export default Finds;
