import { View, Text } from "react-native";
import React from "react";

import { Theme } from "@/constants/Styles";
import { GooglePlace } from "@/types/types";
import Colors from "@/constants/Colors";

interface PlaceSearchResultProps {
  place: GooglePlace;
}

const PlaceSearchResult = ({ place }: PlaceSearchResultProps) => {
  return (
    <View
      style={{
        padding: 20,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFF",
        gap: 10,
      }}
    >
      <Text style={[Theme.BodyText, { textAlign: "center" }]}>
        {place.displayName.text}
      </Text>
      <Text
        style={[
          Theme.BodyText,
          {
            color: Colors.grey,
            textAlign: "center",
          },
        ]}
      >
        {place.shortFormattedAddress}
      </Text>
    </View>
  );
};

export default PlaceSearchResult;
