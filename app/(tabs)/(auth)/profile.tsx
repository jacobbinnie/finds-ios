import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Theme } from "@/constants/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { storage } from "@/utils/storage";

const Profile = () => {
  const { session, setSession } = useAuth();
  const router = useRouter();

  if (!session) {
    return null;
  }

  const handleSignout = () => {
    storage.delete("auth");
    setSession(null);
    router.push("/");
    router.push("/login");
  };

  return (
    <View style={Theme.Container}>
      <SafeAreaView />
      <TouchableOpacity onPress={() => handleSignout()} style={Theme.Button}>
        <Text style={Theme.ButtonText}>{session ? "Sign out" : "Sign in"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
