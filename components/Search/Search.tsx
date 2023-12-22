import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
  const router = useRouter();
  const deviceHeight = useWindowDimensions().height;

  return (
    <View style={{ zIndex: 10 }}>
      <TouchableOpacity
        onPress={() => router.push("/(modals)/search")}
        style={{
          height: deviceHeight * 0.075,
          backgroundColor: "#FFF",
          shadowColor: Colors.grey,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          paddingHorizontal: 20,
          shadowOpacity: 0.2,
          shadowRadius: 2.62,
          elevation: 4,
          borderRadius: 99,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Ionicons name="search" size={15} color={Colors.grey} />
        <Text style={{ fontFamily: "font-s", color: Colors.grey }}>
          Search people or food
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
