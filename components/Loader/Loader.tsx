import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Theme } from "@/constants/Styles";

const Loader = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View>
        <ActivityIndicator />
      </Animated.View>
    </View>
  );
};

export default Loader;
