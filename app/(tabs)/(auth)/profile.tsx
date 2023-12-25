import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { supabase } from "@/utils/supabase";
import { Theme } from "@/constants/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useSupabase } from "@/providers/SupabaseProvider";

const Profile = () => {
  const { profile } = useSupabase();
  const router = useRouter();

  if (!profile) {
    return null;
  }

  return (
    <View style={Theme.Container}>
      <SafeAreaView />
      <TouchableOpacity
        style={Theme.Button}
        onPress={() =>
          profile ? supabase.auth.signOut() : router.push("/(modals)/login")
        }
      >
        <Text style={Theme.ButtonText}>{profile ? "Sign out" : "Sign in"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
