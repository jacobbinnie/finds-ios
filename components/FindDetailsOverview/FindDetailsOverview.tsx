import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { SingleFindDetailsDto } from "@/types/queries";

interface FindDetailsOverviewProps {
  find: SingleFindDetailsDto;
}

const FindDetailsOverview = ({ find }: FindDetailsOverviewProps) => {
  return (
    <View>
      <Image
        style={{ width: "100%", height: 300, objectFit: "cover" }}
        source={{ uri: find.photos[0] }}
      />
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          gap: 10,
          paddingBottom: 20,
          borderEndStartRadius: 10,
          borderEndEndRadius: 10,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: 7,
          }}
        >
          <FontAwesome name="map-marker" size={15} color={Colors.primary} />
          <Text style={Theme.BodyText}>{find.places?.locality}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={Theme.Title}>{find.places?.name}</Text>
          <Text style={Theme.Title}>{find.rating}/10</Text>
        </View>
        <Text style={Theme.BodyText}>{find.review}</Text>
      </View>
    </View>
  );
};

export default FindDetailsOverview;
