import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Theme } from "@/constants/Styles";
import moment from "moment";

interface ReviewCardProps {
  id: string;
  createdAt: string;
  profile: {
    firstname: string;
    username: string;
    image: string | null;
  } | null;
  review: string;
  rating: number;
}

const ReviewCard = ({
  profile,
  review,
  rating,
  createdAt,
}: ReviewCardProps) => {
  return (
    <View style={{ gap: 5 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              objectFit: "cover",
              borderRadius: 99,
            }}
            source={{ uri: profile?.image ?? "" }}
          />

          <Text style={{ fontFamily: "font-b" }}>
            {`${profile?.firstname}`}
          </Text>
          <Text style={Theme.BodyText}>{`@${profile?.username}`}</Text>
        </View>
        <Text style={Theme.BodyText}>{`Rating: ${rating}`}</Text>
      </View>
      <Text style={Theme.BodyText}>{review}</Text>
      {/* <View
        style={{
          backgroundColor: Colors.light,
          padding: 5,
          display: "flex",
        }}
      >
        <Text style={Theme.BodyText}>{moment(createdAt).format("lll")}</Text>
      </View> */}
    </View>
  );
};

export default ReviewCard;
