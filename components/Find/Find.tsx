import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Theme } from "@/constants/Styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface FindProps {
  id: string;
  rating: number;
  review: string;
  photo: string;
  place: {
    name: string;
    id: string;
  } | null;
  profile: {
    id: string;
    firstname: string;
    username: string;
  } | null;
}

const Find = ({ id, place, photo, profile, rating, review }: FindProps) => {
  return (
    <View
      id={id}
      style={{
        width: "100%",
        height: Dimensions.get("window").height - 129,
      }}
    >
      <View
        style={{
          backgroundColor: "#FFF",
          borderRadius: 10,
          paddingBottom: 20,
          shadowColor: Colors.grey,
          overflow: "hidden",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.62,
          elevation: 4,
          display: "flex",
          position: "relative",
        }}
      >
        <Text
          style={{
            position: "absolute",
            zIndex: 10,
            top: 10,
            left: 10,
            backgroundColor: Colors.light,
            padding: 10,
            borderRadius: 10,
            overflow: "hidden",
            fontFamily: "font-m",
          }}
        >
          {place?.name}
        </Text>

        <Image
          style={{ width: "100%", height: 300, objectFit: "cover" }}
          source={{ uri: photo }}
        />
        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 10,
            gap: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={Theme.Title}>{`Find by @${profile?.username}`}</Text>
            <Text style={Theme.Title}>{rating}/10</Text>
          </View>
          <Text style={Theme.BodyText}>{review}</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 20,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            display: "flex",
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 99,
          }}
        >
          <Ionicons name="ios-heart" size={35} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFF",
            display: "flex",
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 99,
          }}
        >
          <AntDesign name="like1" size={35} color={Colors.light} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Find;
