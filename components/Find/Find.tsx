import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Theme } from "@/constants/Styles";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { SingleFind } from "@/types/queries";

interface FindProps {
  find: SingleFind & {
    isLiked: boolean;
  };
}

const Find = ({ find }: FindProps) => {
  const deviceHeight = useWindowDimensions().height;
  const router = useRouter();

  return (
    <View
      id={find.id}
      style={{
        width: "100%",
        height: deviceHeight * 0.7,
      }}
    >
      <View
        style={{
          display: "flex",
          position: "relative",
          height: deviceHeight * 0.7,
          borderRadius: 10,
          overflow: "hidden",
          shadowColor: Colors.grey,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.62,
          elevation: 4,
        }}
      >
        <TouchableOpacity onPress={() => router.push(`/find/${find.id}`)}>
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
            {`Find by @${find.profile?.username}`}
          </Text>

          <Image
            style={{
              width: "100%",
              height: deviceHeight * 0.35,
              objectFit: "cover",
            }}
            source={{ uri: find.photos[0] }}
          />
          <View
            style={{
              height: 100,
              display: "flex",
              justifyContent: "center",
              paddingHorizontal: 10,
              gap: 10,
              backgroundColor: "#FFF",
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
        </TouchableOpacity>

        <View
          style={{
            height: deviceHeight * 0.17,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 40,
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
              shadowColor: Colors.grey,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            <Ionicons name="ios-heart" size={35} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: find.isLiked ? Colors.secondary : "#FFF",
              display: "flex",
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 99,
              shadowColor: Colors.grey,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            <AntDesign name="like1" size={35} color={Colors.light} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Find;
