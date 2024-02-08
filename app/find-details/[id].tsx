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
import { Feather, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { Divider, Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import ImageSwiper from "@/components/ImageSwiper/ImageSwiper";
import { FindDto } from "@/types/generated";
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
  const route = useRoute();
  const { id } = useLocalSearchParams<{ id: string; data: string }>();
  const router = useRouter();
  const { session } = useAuth();

  const deviceHeight = useWindowDimensions().height;

  const [isCapturing, setIsCapturing] = useState(false);

  const {
    data: find,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(findsQuery.findsControllerGetFindById(id!));

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
          paddingHorizontal: 15,
          paddingVertical: 10,
          gap: 5,
          borderRadius: 99,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          right: 15,
          top: 15,
          zIndex: 20,
        }}
      >
        <Text style={Theme.ButtonText}>Place details</Text>
        <Ionicons name="arrow-forward-outline" size={20} color={Colors.dark} />
      </TouchableOpacity>

      <ScrollView style={{ paddingBottom: 550 }}>
        <ViewShot ref={ref} options={{ format: "jpg", quality: 1 }}>
          <ImageSwiper
            isSwipable={find.images.length > 1}
            images={find.images}
            height={deviceHeight * 0.5}
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

                <Text style={[Theme.Caption]}>{`@${find.user.username}`}</Text>
              </TouchableOpacity>
            )}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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

              <TouchableOpacity onPress={() => handleShare()}>
                <Feather name="share" size={30} color={Colors.dark} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ gap: 15 }}>
            <Text style={Theme.BigTitle}>Review</Text>

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
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                marginBottom: 2,
              }}
            >
              {find.tags.map((tag, index) => (
                <Text
                  key={index}
                  style={[
                    Theme.Caption,
                    {
                      backgroundColor: Colors.light,
                      padding: 10,
                      borderRadius: 10,
                      overflow: "hidden",
                      textAlign: "center",
                    },
                  ]}
                >
                  {tag}
                </Text>
              ))}
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
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default FindDetails;
