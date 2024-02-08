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
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

interface FindProps {
  isProfileFind?: boolean;
  isPlaceFind?: boolean;
  findHeight: number;
  find: FindDto;
}

const Find = ({ isProfileFind, isPlaceFind, findHeight, find }: FindProps) => {
  const router = useRouter();
  const { session, signout } = useAuth();

  const [isCapturing, setIsCapturing] = useState(false);

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

  const ref = useRef<ViewShot>(null);

  const handleCapture = () => {
    setIsCapturing(true); // Set capturing to true when capturing starts
    return (
      ref.current &&
      ref.current.capture &&
      ref.current.capture().then((uri: string) => {
        setIsCapturing(false); // Set capturing to false when capturing ends
        return uri;
      })
    );
  };

  const handleShare = async () => {
    const uri = await handleCapture();
    if (uri) {
      Sharing.shareAsync(uri);
    }
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

          <View style={{ width: "100%", opacity: 0, position: "absolute" }}>
            <ViewShot ref={ref} options={{ format: "jpg", quality: 1 }}>
              <ImageSwiper
                images={find.images}
                height={imageheight}
                onPressCallback={onPressCallback}
                isCapturing={isCapturing}
              />
              <View
                style={{
                  position: "absolute",
                  opacity: isCapturing ? 1 : 0,
                  bottom: 10,
                  left: 10,
                }}
              >
                <Text
                  style={[
                    Theme.BigTitle,
                    {
                      color: Colors.light,
                      fontFamily: "font-serif",
                      paddingHorizontal: 5,
                    },
                  ]}
                >
                  finds.nyc
                </Text>
              </View>
            </ViewShot>
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
                    borderRadius: 99,
                    borderWidth: 1,
                    borderColor: Colors.light,
                    padding: 5,
                  }}
                >
                  {find.user.avatar ? (
                    <Image
                      source={{ uri: find.user.avatar }}
                      style={{ width: 25, height: 25, borderRadius: 99 }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 99,
                        backgroundColor: Colors.light,
                      }}
                    />
                  )}

                  <Text
                    style={[Theme.Caption]}
                  >{`@${find.user.username}`}</Text>
                </TouchableOpacity>
              )}

              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.dark,
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
                <TouchableOpacity onPress={() => handleShare()}>
                  <Feather name="share" size={30} color={Colors.light} />
                </TouchableOpacity>

                {session?.accessToken ? (
                  <SaveButton findId={find.id} />
                ) : (
                  <TouchableOpacity
                    onPress={() => router.push("/(modals)/login")}
                  >
                    <Ionicons name="ios-heart" size={30} color={Colors.light} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Find;
