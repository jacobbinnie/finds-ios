import { View, Text, Image } from "react-native";
import React, { useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { Theme } from "@/constants/Styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import ImageSwiper from "../ImageSwiper/ImageSwiper";
import { useAuth } from "@/providers/AuthProvider";
import { FindDto } from "@/types/generated";
import { formatPostDate } from "@/utils/formatPostDate";
import SaveButton from "../SaveButton/SaveButton";
import { useRouter } from "expo-router";

interface FindProps {
  isProfileFind?: boolean;
  isPlaceFind?: boolean;
  findHeight: number;
  find: FindDto;
}

const Find = ({ isProfileFind, isPlaceFind, findHeight, find }: FindProps) => {
  const router = useRouter();
  const { session, signout } = useAuth();

  const bottomOffset = 15;
  const descriptionCardHeight = 200;
  const imageheight = findHeight - descriptionCardHeight - bottomOffset;

  const handleGoToProfile = () => {
    if (session) {
      session.profile.id === find.user.id
        ? router.push("/(tabs)/(auth)/my-profile")
        : router.push(`/profile/${find.user.id}`);
    } else {
      router.push(`/profile/${find.user.id}`);
    }
  };

  const onPressCallback = () => {
    router.push({
      pathname: `/find-details/${find.id}`,
    });
  };

  return (
    <View
      style={{
        width: "100%",
        height: findHeight ?? 0,
      }}
    >
      <View
        style={{
          display: "flex",
          position: "relative",
          flex: 1,
          marginBottom: bottomOffset,
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: "#FFF",
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
        <TouchableOpacity activeOpacity={1} onPress={onPressCallback}>
          <ImageSwiper
            images={find.images}
            height={imageheight}
            onPressCallback={onPressCallback}
          />

          <View
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              paddingHorizontal: 15,
              backgroundColor: "#FFF",
              borderEndStartRadius: 10,
              borderEndEndRadius: 10,
              overflow: "hidden",
              height: descriptionCardHeight,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {find.user && !isProfileFind && (
                <TouchableOpacity
                  onPress={handleGoToProfile}
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {find.user.avatar ? (
                    <Image
                      source={{ uri: find.user.avatar }}
                      style={{ width: 35, height: 35, borderRadius: 99 }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 99,
                        backgroundColor: Colors.light,
                      }}
                    />
                  )}

                  <Text style={[Theme.Caption]}>
                    {`@${find.user.username}`}
                  </Text>
                </TouchableOpacity>
              )}

              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.primary,
                  borderRadius: 99,
                  padding: 10,
                }}
              >
                <Text style={[Theme.Caption, { color: Colors.light }]}>
                  {find.category.name}
                </Text>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <View
                style={{
                  display: "flex",
                  gap: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text numberOfLines={1} style={Theme.Title}>
                  {find.review.replace(/(?:\r\n|\r|\n)/g, " ")}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  gap: 5,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    Theme.Caption,
                    {
                      color: Colors.grey,
                      fontFamily: "font-b",
                    },
                  ]}
                >
                  {find.place.name}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: 5,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      Theme.Caption,
                      {
                        color: Colors.grey,

                        textAlign: "right",
                      },
                    ]}
                  >
                    {find.place.address}
                  </Text>
                </View>
              </View>
            </View>

            <Divider />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[Theme.Caption, { color: Colors.grey }]}>
                {formatPostDate(find.createdAt)}
              </Text>

              <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
                {session?.accessToken ? (
                  <SaveButton findId={find.id} />
                ) : (
                  <TouchableOpacity
                    onPress={() => router.push("/(modals)/login")}
                  >
                    <Ionicons name="ios-heart" size={30} color={Colors.grey} />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: `/(modals)/sharing/${find.id}`,
                    })
                  }
                >
                  <Feather name="share" size={30} color={Colors.grey} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Find;
