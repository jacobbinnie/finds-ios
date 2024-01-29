import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Theme } from "@/constants/Styles";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { FindAction } from "@/types/types";
import { Query, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  format,
  isThisMinute,
  isThisHour,
  isToday,
  isYesterday,
} from "date-fns";
import { Divider } from "react-native-elements";
import ImageSwiper from "../ImageSwiper/ImageSwiper";
import { useAuth } from "@/providers/AuthProvider";
import { FindDto } from "@/types/generated";

interface FindProps {
  isProfileFind?: boolean;
  isPlaceFind?: boolean;
  findHeight: number;
  find: FindDto;
}

const Find = ({ isProfileFind, isPlaceFind, findHeight, find }: FindProps) => {
  const router = useRouter();
  const { session } = useAuth();

  const bottomOffset = 15;
  const descriptionCardHeight = 180;
  const imageheight = findHeight - descriptionCardHeight - bottomOffset;

  // const { data: existingSave, refetch: refetchSave } = useQuery({
  //   queryKey: ["saves", "find", find.id],
  //   queryFn: async () => {
  //     if (!profile) return null;

  //     const { data, error } = await supabase
  //       .from("saves")
  //       .select("id")
  //       .eq("find", find.id)
  //       .eq("profile", profile.id);

  //     if (error) throw error;

  //     return data?.[0] ?? null;
  //   },
  // });

  const handleGoToProfile = () => {
    if (session) {
      session.profile.id === find.user.id
        ? router.push("/(tabs)/(auth)/my-profile")
        : router.push(`/profile/${find.user.id}`);
    } else {
      router.push(`/profile/${find.user.id}`);
    }
  };

  const handleAction = async (action: FindAction) => {
    try {
      if (!session) {
        return router.push("/(modals)/login");
      }

      if (action === FindAction.SAVE) {
        // do something here
      } else {
        // do something here
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onPressCallback = () => {
    router.push({
      pathname: `/find-details/${find.id}`,
      params: {
        data: JSON.stringify(find),
      },
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
              {find.user.avatar && !isProfileFind && (
                <TouchableOpacity
                  onPress={handleGoToProfile}
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    backgroundColor: Colors.light,
                    borderRadius: 99,
                    padding: 5,
                  }}
                >
                  <Image
                    source={{ uri: find.user.avatar }}
                    style={{ width: 25, height: 25, borderRadius: 99 }}
                  />

                  <Text
                    style={[Theme.BodyText]}
                  >{`@${find.user.username}`}</Text>
                </TouchableOpacity>
              )}

              <View
                style={{
                  padding: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.dark,
                  borderRadius: 99,
                }}
              >
                <Text style={[Theme.BodyText, { color: Colors.light }]}>
                  {find.rating}
                </Text>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              {!isPlaceFind && (
                <View
                  style={{
                    display: "flex",
                    gap: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text numberOfLines={1} style={Theme.Title}>
                    {find.review}
                  </Text>
                </View>
              )}

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  numberOfLines={isPlaceFind ? 2 : 1}
                  style={[Theme.ReviewText, { color: Colors.grey }]}
                >
                  {find.place.name}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: 5,
                    maxWidth: "75%",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[Theme.Caption, { color: Colors.grey }]}
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
                {isThisMinute(find.createdAt)
                  ? "Just now"
                  : isThisHour(find.createdAt)
                  ? "In the past hour"
                  : isToday(find.createdAt)
                  ? "Today"
                  : isYesterday(find.createdAt)
                  ? "Yesterday"
                  : format(new Date(find.createdAt), "MMM dd, yyyy")}
              </Text>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <TouchableOpacity onPress={() => handleAction(FindAction.SAVE)}>
                  <Ionicons
                    name="ios-heart"
                    size={30}
                    color={Colors.light} // TODO: add existing save logic
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAction(FindAction.FIND)}>
                  <Entypo name="loop" size={30} color={Colors.light} />
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
