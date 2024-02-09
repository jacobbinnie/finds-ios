import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import Loader from "@/components/Loader/Loader";

const Loading = () => {
  const dimensions = useWindowDimensions();

  return (
    <View
      style={{
        height: dimensions.height,
        width: dimensions.width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </View>
  );
};

export default Loading;
