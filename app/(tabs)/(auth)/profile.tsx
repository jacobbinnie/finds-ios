import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Theme } from "@/constants/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

const Profile = () => {
  const { profile } = useAuth();
  const router = useRouter();

  if (!profile) {
    return null;
  }

  return (
    <View style={Theme.Container}>
      <SafeAreaView />
      <TouchableOpacity style={Theme.Button}>
        <Text style={Theme.ButtonText}>{profile ? "Sign out" : "Sign in"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
