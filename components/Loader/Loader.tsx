import { View, Text } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Theme } from "@/constants/Styles";

const Loader = () => {
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.Text style={Theme.Title} entering={FadeIn} exiting={FadeOut}>
        Loading...
      </Animated.Text>
    </View>
  );
};

export default Loader;
