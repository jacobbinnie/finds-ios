import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import FindReviews from "@/components/FindReviews/FindReviews";
import { SingleFindDetailsDto, FindDetailsQuery } from "@/types/queries";
import { supabase } from "@/utils/supabase";
import FindDetailsOverview from "@/components/FindDetailsOverview/FindDetailsOverview";
import { Theme } from "@/constants/Styles";
import { AntDesign } from "@expo/vector-icons";

const FindDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const {
    data: find,
    isLoading,
    isError,
  } = useQuery<SingleFindDetailsDto>({
    queryKey: ["find", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("finds")
        .select(FindDetailsQuery)
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

  if (!find) {
    return <Text>Find not found</Text>;
  }

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => router.replace(`/place/[id goes here]}`)} // TODO: replace with actual place id
        style={{
          position: "absolute",
          zIndex: 10,
          top: 10,
          right: 10,
          backgroundColor: Colors.light,
          padding: 10,
          borderRadius: 10,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text style={Theme.BodyText}>See more info</Text>
        <AntDesign name="arrowright" size={20} color={Colors.dark} />
      </TouchableOpacity>

      <FindDetailsOverview find={find} />

      {find?.profile && (
        <View style={{ paddingHorizontal: 10 }}>
          <ProfileCard profile={find.profile} />
        </View>
      )}
    </View>
  );
};

export default FindDetails;
