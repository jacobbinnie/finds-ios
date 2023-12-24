import { View, Text, Image } from "react-native";
import React from "react";
import { Theme } from "@/constants/Styles";
import { SingleFindReviewsDto } from "@/types/queries";

interface ReviewCardProps {
  review: SingleFindReviewsDto;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <View style={{ gap: 10 }}>
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
            source={{ uri: review.profile?.image ?? "" }}
          />

          <Text style={{ fontFamily: "font-b" }}>
            {`${review.profile?.firstname}`}
          </Text>
          <Text style={Theme.BodyText}>{`@${review.profile?.username}`}</Text>
        </View>
        <Text style={Theme.BodyText}>{`Rating: ${review.rating}`}</Text>
      </View>
      <Text style={Theme.BodyText}>{review.review}</Text>
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
