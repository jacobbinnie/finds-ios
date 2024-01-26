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
              display: isProfileFind ? "none" : "flex",
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
              onPress={() => router.push(`/profile/${find.user.id}`)}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              {find.user.avatar && (
                <Image
                  source={{ uri: find.user.avatar }}
                  style={{ width: 25, height: 25, borderRadius: 99 }}
                />
              )}
              <Text style={Theme.ButtonText}>{`@${find.user.username}`}</Text>
            </TouchableOpacity>
          </View>

          <ImageSwiper
            images={find.images}
            height={findHeight * 0.7}
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
            <Text
              style={[
                Theme.ButtonText,
                { color: Colors.dark, fontFamily: "font-b" },
              ]}
            >
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
              {!isPlaceFind && (
                <View
                  style={{
                    display: "flex",
                    gap: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={Theme.Title}>{find.place.name}</Text>
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
                      {find.place.address}
                    </Text>
                  </View>
                </View>
              )}
              <Text
                numberOfLines={isPlaceFind ? 2 : 1}
                style={Theme.ReviewText}
              >
                {find.review}
              </Text>
            </View>

            <Divider />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
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
                    size={findHeight * 0.05}
                    color={Colors.light} // TODO: add existing save logic
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAction(FindAction.FIND)}>
                  <Entypo
                    name="loop"
                    size={findHeight * 0.05}
                    color={Colors.light}
                  />
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
