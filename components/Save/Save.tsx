import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Theme } from "@/constants/Styles";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { SingleFindDto } from "@/types/queries";
import ImageSwiper from "../ImageSwiper/ImageSwiper";

interface FindProps {
  profileFind?: boolean;
  saveHeight: number;
  find: SingleFindDto;
}

const Save = ({ profileFind, saveHeight, find }: FindProps) => {
  const router = useRouter();

  const onPressCallback = () =>
    router.push({
      pathname: `/find-details/${find.id}`,
      params: {
        data: JSON.stringify(find),
      },
    });

  return (
    <View
      id={find.id}
      style={{
        width: "100%",
        height: saveHeight ?? 0,
      }}
    >
      <View
        style={{
          display: "flex",
          position: "relative",
          height: "100%",
          borderRadius: 10,
          overflow: "hidden",
          shadowColor: Colors.grey,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.62,
          backgroundColor: Colors.light,
          elevation: 4,
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={onPressCallback}>
          <View
            style={{
              display: profileFind ? "none" : "flex",
              position: "absolute",
              zIndex: 10,
              top: 15,
              left: 15,
              backgroundColor: Colors.light,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              onPress={onPressCallback}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              {find.profile?.image && (
                <Image
                  source={{ uri: find.profile?.image }}
                  style={{ width: 25, height: 25, borderRadius: 99 }}
                />
              )}
              <Text
                style={{
                  fontFamily: "font-m",
                  fontSize: 16,
                }}
              >
                {`Find by @${find.profile?.username}`}
              </Text>
            </TouchableOpacity>
          </View>

          <ImageSwiper
            images={find.photos}
            height={saveHeight * 0.675}
            onPressCallback={onPressCallback}
          />

          <View
            style={{
              width: 45,
              height: 45,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.primary,
              borderRadius: 99,
              position: "absolute",
              right: 15,
              top: 15,
            }}
          >
            <Text style={[Theme.ButtonText, { color: Colors.light }]}>
              {find.rating}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              paddingHorizontal: 15,
              backgroundColor: "#FFF",
              borderEndStartRadius: 10,
              borderEndEndRadius: 10,
              overflow: "hidden",
            }}
          >
            <View style={{ gap: 10, paddingVertical: 15 }}>
              <View
                style={{
                  display: "flex",
                  gap: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text style={Theme.Title}>{find.places?.name}</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: 5,
                    maxWidth: "75%",
                  }}
                >
                  <FontAwesome
                    name="map-marker"
                    size={15}
                    color={Colors.primary}
                  />
                  <Text
                    numberOfLines={1}
                    style={[Theme.Caption, { color: Colors.grey }]}
                  >
                    {find.places?.short_formatted_address}
                  </Text>
                </View>
              </View>
              <Text numberOfLines={1} style={Theme.ReviewText}>
                {find.review}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Save;
