import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  TouchableHighlight,
} from "react-native";
import React, { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { Divider, Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import ImageSwiper from "@/components/ImageSwiper/ImageSwiper";
import { useRoute } from "@react-navigation/native";
import { FindAction } from "@/types/types";
import { useAuth } from "@/providers/AuthProvider";
import { formatPostDate } from "@/utils/formatPostDate";
import { useQuery } from "@tanstack/react-query";
import { findsQuery } from "@/types/queries";
import Loader from "@/components/Loader/Loader";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const FindDetails = () => {
  const { id } = useLocalSearchParams<{ id: string; data: string }>();
  const router = useRouter();
  const { session } = useAuth();

  const deviceHeight = useWindowDimensions().height;

  const {
    data: find,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(findsQuery.findsControllerGetFindById({ data: { id } }));

  const handleGoToProfile = () => {
    if (session) {
      session.profile.id === find?.user.id
        ? router.replace("/(tabs)/(auth)/my-profile")
        : router.replace(`/profile/${find?.user.id}`);
    } else {
      router.replace(`/profile/${find?.user.id}`);
    }
  };

  const handleAction = async (action: FindAction) => {};

  if (!find) {
    return <Loader />;
  }

  return (
    <ScrollView
      id={id}
      style={{
        width: "100%",
        minHeight: deviceHeight * 1.5 ?? 0,
        backgroundColor: "#FFF",
      }}
    >
      <ScrollView style={{ paddingBottom: 550 }}>
        <ImageSwiper
          isSwipable={find.images.length > 1}
          images={find.images}
          height={deviceHeight * 0.5}
        />

        <View
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: 15,
            backgroundColor: "#FFF",
            borderEndStartRadius: 10,
            borderEndEndRadius: 10,
            overflow: "hidden",
            gap: 15,
            flex: 1,
          }}
        >
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
                gap: 5,
              }}
            >
              <Text
                numberOfLines={1}
                style={[
                  Theme.Caption,
                  {
                    color: Colors.dark,
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
                      color: Colors.dark,

                      textAlign: "right",
                    },
                  ]}
                >
                  {find.place.address}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                const stringedPlace = JSON.stringify(find.place);

                router.replace({
                  pathname: `/place/${find.place.googlePlaceId}`,
                  params: { data: stringedPlace },
                });
              }}
              style={{
                backgroundColor: Colors.light,
                padding: 10,
                gap: 5,
                borderRadius: 99,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={[Theme.Caption, { color: Colors.dark }]}>
                See more
              </Text>
              <Ionicons
                name="arrow-forward-outline"
                size={15}
                color={Colors.dark}
              />
            </TouchableOpacity>
          </View>

          <Divider />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {find.user && (
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

                <Text style={[Theme.Caption]}>{`@${find.user.username}`}</Text>
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

          <View style={{ gap: 15 }}>
            <View
              style={{
                display: "flex",
                gap: 5,
                justifyContent: "space-between",
              }}
            >
              <Text style={[Theme.BodyText, { lineHeight: 20 }]}>
                {find.review.replace("\\n", "\n")}
              </Text>
              <Text style={[Theme.Caption, { color: Colors.grey }]}>
                {find.createdAt && formatPostDate(find.createdAt)}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                {find.tags.map((tag, index) => (
                  <View
                    key={index}
                    style={{
                      padding: 1,
                      borderRadius: 99,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="tag" size={12} color={Colors.dark} />
                    <Text
                      key={index}
                      style={[
                        Theme.Caption,
                        {
                          textAlign: "center",
                          color: Colors.dark,
                        },
                      ]}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: `/(modals)/sharing/${find.id}`,
                  })
                }
              >
                <Feather name="share" size={25} color={Colors.grey} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default FindDetails;
