import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import Colors from "@/constants/Colors";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import ReviewPreviewCard from "@/components/ReviewPreviewCard/ReviewPreviewCard";
import FindReviews from "@/components/FindReviews/FindReviews";

const FindDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: find,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["find"],
    queryFn: async () => {
      const response = await supabase
        .from("finds")
        .select(
          `
        id,
        rating,
        review,
        photos,
        places (
          name,
          id,
          locality
        ),
        profile (
          id,
          firstname,
          username,
          image,
          finds (
            id
          )
        )
        `
        )
        .eq("id", id)
        .single();
      return response;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >
      <Text
        style={{
          position: "absolute",
          zIndex: 10,
          top: 10,
          right: 10,
          backgroundColor: Colors.light,
          padding: 10,
          borderRadius: 10,
          overflow: "hidden",
          fontFamily: "font-m",
        }}
      >
        {"Add to my finds"}
      </Text>

      <ReviewPreviewCard
        place={find?.data?.places}
        photo={find?.data?.photos[0]}
        rating={find?.data?.rating}
        review={find?.data?.review}
      />

      <View style={{ paddingHorizontal: 10 }}>
        <ProfileCard profile={find?.data?.profile} />
      </View>

      {find?.data?.places?.id && <FindReviews id={find?.data?.places?.id} />}
    </View>
  );
};

export default FindDetails;
