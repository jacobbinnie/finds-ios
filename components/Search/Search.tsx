import { View, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";

const Search = () => {
  return (
    <View
      style={{
        zIndex: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Aligns items along the main axis (horizontal in this case)
      }}
    >
      <Text style={Theme.BigTitle}>finds.nyc</Text>
    </View>
  );
};

export default Search;
