import { View } from "react-native";
import React from "react";
import { Theme } from "@/constants/Styles";

const Search = () => {
  return (
    <View
      style={[
        Theme.Container,
        { justifyContent: "center", alignItems: "center", gap: 10 },
      ]}
    ></View>
  );
};

export default Search;
