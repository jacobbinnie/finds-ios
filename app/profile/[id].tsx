import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import { ProfileDetailsQuery, ProfileDetailsDto } from "@/types/queries";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ProfileDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<ProfileDetailsDto>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profile")
        .select(ProfileDetailsQuery)
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        throw error;
      }
      return data;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  if (!profile) {
    return <Text>Profile not found</Text>;
  }

  console.log(profile);

  return (
    <>
      <SafeAreaView />
      <View>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 35,
            height: 35,
            borderRadius: 99,
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text>{id}</Text>
      </View>
    </>
  );
};

export default ProfileDetails;
