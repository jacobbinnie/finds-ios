import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";

const Search = () => {
  const router = useRouter();
  const deviceHeight = useWindowDimensions().height;

  return (
    <View
      style={{
        zIndex: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 15,
      }}
    >
      <Text style={[Theme.Title, { fontSize: 32, color: Colors.primary }]}>
        finds
      </Text>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => router.push("/(modals)/search")}
          style={{
            height: deviceHeight * 0.07,
            backgroundColor: "#FFF",
            paddingHorizontal: 20,
            elevation: 4,
            borderRadius: 99,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Ionicons name="search" size={18} color={Colors.dark} />
          <Text
            style={[
              Theme.Title,
              {
                color: Colors.dark,
              },
            ]}
          >
            Search finds
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
