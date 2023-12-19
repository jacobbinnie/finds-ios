import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

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

      <Image
        style={{ width: "100%", height: 200, objectFit: "cover" }}
        source={{ uri: find?.data?.photos[0] }}
      />
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          gap: 10,
          paddingBottom: 20,
          borderEndStartRadius: 10,
          borderEndEndRadius: 10,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: 7,
          }}
        >
          <FontAwesome name="map-marker" size={15} color={Colors.primary} />
          <Text style={Theme.BodyText}>{find?.data?.places?.locality}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={Theme.Title}>{find?.data?.places?.name}</Text>
          <Text style={Theme.Title}>{find?.data?.rating}/10</Text>
        </View>
        <Text style={Theme.BodyText}>{find?.data?.review}</Text>

        <ProfileCard profile={find?.data?.profile} />
      </View>
    </View>
  );
};

export default FindDetails;
