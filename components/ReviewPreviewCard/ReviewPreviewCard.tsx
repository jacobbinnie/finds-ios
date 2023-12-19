import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import Colors from "@/constants/Colors";

interface ReviewPreviewCardProps {
  photo?: string;
  place:
    | {
        name: string;
        id: string;
        locality: string | null;
      }
    | null
    | undefined;
  rating?: number;
  review?: string;
}

const ReviewPreviewCard = ({
  place,
  photo,
  rating,
  review,
}: ReviewPreviewCardProps) => {
  return (
    <View>
      <Image
        style={{ width: "100%", height: 200, objectFit: "cover" }}
        source={{ uri: photo }}
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
          <Text style={Theme.BodyText}>{place?.locality}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={Theme.Title}>{place?.name}</Text>
          <Text style={Theme.Title}>{rating}/10</Text>
        </View>
        <Text style={Theme.BodyText}>{review}</Text>
      </View>
    </View>
  );
};

export default ReviewPreviewCard;
