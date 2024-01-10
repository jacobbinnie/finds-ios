import { View, Text, TouchableOpacity, LayoutAnimation } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";

const CreateFind = () => {
  const { id, data } = useLocalSearchParams<{ id: string; data: string }>();
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const router = useRouter();
  const place = JSON.parse(data); // needs type

  return (
    <View
      style={[
        Theme.Container,
        {
          paddingVertical: 15,
          gap: 15,
        },
      ]}
    >
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: 10,
            maxWidth: "75%",
          }}
        >
          <FontAwesome name="map-marker" size={15} color={Colors.primary} />
          <Text numberOfLines={1} style={Theme.BodyText}>
            address
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            borderColor: Colors.grey,
            borderWidth: 1,
            paddingHorizontal: 15,
            paddingVertical: 15,
            gap: 5,
            borderRadius: 99,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={[Theme.BodyText, { color: Colors.grey }]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            width: "50%",
            paddingVertical: 15,
            gap: 5,
            borderRadius: 99,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[Theme.BodyText, { color: Colors.light }]}>Publish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateFind;
