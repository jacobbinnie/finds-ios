import { View, Text, Image } from "react-native";
import React from "react";
import { Profile } from "@/types/types";
import { Theme } from "@/constants/Styles";

interface SearchResultProps {
  profile: Profile;
}

const SearchResult = ({ profile }: SearchResultProps) => {
  return (
    <View
      style={{
        padding: 20,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFF",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={{ uri: profile.image ?? undefined }}
        style={{ width: 20, height: 20, borderRadius: 99 }}
      />
      <Text style={Theme.BodyText}>@{profile.username}</Text>
    </View>
  );
};

export default SearchResult;
