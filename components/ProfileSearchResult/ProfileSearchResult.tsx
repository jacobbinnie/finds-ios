import { View, Text, Image } from "react-native";
import React from "react";
import { Theme } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { ProfileDto } from "@/types/generated";

interface SearchResultProps {
  profile: ProfileDto;
}

const ProfileSearchResult = ({ profile }: SearchResultProps) => {
  return (
    <View
      style={{
        padding: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {profile.avatar ? (
        <Image
          source={{ uri: profile.avatar }}
          style={{ width: 25, height: 25 }}
        />
      ) : (
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 99,
            backgroundColor: Colors.light,
          }}
        />
      )}

      <View
        style={{
          gap: 5,
        }}
      >
        <Text style={Theme.Caption}>{profile.firstname}</Text>
        <Text
          style={[
            Theme.Caption,
            {
              color: Colors.grey,
            },
          ]}
        >
          @{profile.username}
        </Text>
      </View>
    </View>
  );
};

export default ProfileSearchResult;
