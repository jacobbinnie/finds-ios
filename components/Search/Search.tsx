import { View, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";

const Search = () => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity
        onPress={() => router.push("/(modals)/search")}
        style={{
          padding: 20,
          backgroundColor: Colors.light,
          shadowColor: Colors.grey,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.4,
          shadowRadius: 2.62,
          elevation: 4,
          borderRadius: 99,
        }}
      >
        <Text style={{ fontFamily: "agr-wm", color: Colors.grey }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
