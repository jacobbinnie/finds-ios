import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { Divider, Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import ImageSwiper from "@/components/ImageSwiper/ImageSwiper";
import { FindDto } from "@/types/generated";
import { useRoute } from "@react-navigation/native";
import { FindAction } from "@/types/types";
import { useAuth } from "@/providers/AuthProvider";
import { formatPostDate } from "@/utils/formatPostDate";

const FindDetails = () => {
  const route = useRoute();
  const { id, data } = useLocalSearchParams<{ id: string; data: string }>();
  const router = useRouter();
  const { session } = useAuth();

  const deviceHeight = useWindowDimensions().height;

  const find = JSON.parse(data) as FindDto;

  const handleGoToProfile = () => {
    if (session) {
      session.profile.id === find.user.id
        ? router.replace("/(tabs)/(auth)/my-profile")
        : router.replace(`/profile/${find.user.id}`);
    } else {
      router.replace(`/profile/${find.user.id}`);
    }
  };

  const handleAction = async (action: FindAction) => {};

  return (
    <ScrollView
      id={id}
      style={{
        width: "100%",
        minHeight: deviceHeight * 1.5 ?? 0,
        backgroundColor: "#FFF",
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
          backgroundColor: "#FFF",
          elevation: 4,
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
          <Ionicons
            name="arrow-forward-outline"
            size={20}
            color={Colors.dark}
          />
        </TouchableOpacity>

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
              <Text style={[Theme.Title, { lineHeight: 22 }]}>
                {find.review.replace("\\n", "\n")}
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
        </View>
      </View>
    </ScrollView>
  );
};

export default FindDetails;
