import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";

const Search = () => {
  const router = useRouter();
  const deviceHeight = useWindowDimensions().height;

  return (
    <View
      style={{
        zIndex: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Aligns items along the main axis (horizontal in this case)
      }}
    >
      <Text style={[Theme.Title, { fontSize: 32, color: Colors.primary }]}>
        finds
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/(modals)/search")}
          style={{
            height: deviceHeight * 0.065,
            width: deviceHeight * 0.065,
            backgroundColor: "#FFF",
            elevation: 4,
            borderRadius: 99,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="search"
            size={deviceHeight * 0.03}
            color={Colors.dark}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
