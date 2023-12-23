import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Theme } from "@/constants/Styles";
import { Find, Profile } from "@/types/types";

interface ProfileCardProps {
  profile:
    | Profile & {
        finds: {
          id: string;
        }[];
      };
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: Colors.light,
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
          gap: 10,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: 99,
          }}
          source={{ uri: profile?.image ?? "" }}
        />
        <View style={{ gap: 5 }}>
          <Text style={{ fontFamily: "font-b" }}>
            {`${profile?.firstname}`}
          </Text>
          <Text style={Theme.BodyText}>{`@${profile?.username}`}</Text>
        </View>
      </View>

      <Text style={Theme.BodyText}>
        {`${profile?.finds.length} total finds`}
      </Text>
    </View>
  );
};

export default ProfileCard;
