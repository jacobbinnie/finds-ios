import { View, Text } from "react-native";
import React from "react";

import { Theme } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { GooglePlaceDto } from "@/types/generated";

interface PlaceSearchResultProps {
  place: GooglePlaceDto;
}

const PlaceSearchResult = ({ place }: PlaceSearchResultProps) => {
  return (
    <View
      style={{
        padding: 15,
        display: "flex",
        gap: 5,
      }}
    >
      <Text style={Theme.Caption}>{place.displayName.text}</Text>
      <Text
        style={[
          Theme.Caption,
          {
            color: Colors.grey,
          },
        ]}
      >
        {place.shortFormattedAddress}
      </Text>
    </View>
  );
};

export default PlaceSearchResult;
