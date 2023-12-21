import { View, Text, Image } from "react-native";
import React from "react";
import { Profile } from "@/interfaces";
import Colors from "@/constants/Colors";
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
      }}
    >
      <Image
        source={{ uri: profile.image }}
        style={{ width: 20, height: 20 }}
      />
      <Text style={Theme.BodyText}>@{profile.username}</Text>
    </View>
  );
};

export default SearchResult;
