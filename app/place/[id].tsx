import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Linking,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { GooglePlace, Place } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Find from "@/components/Find/Find";
import { useAuth } from "@/providers/AuthProvider";
import { placesQuery } from "@/types/queries";
import { PlaceDto } from "@/types/generated";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";

const PlaceDetails = () => {
  const { id, data } = useLocalSearchParams<{
    id: string;
    data: string;
    searchData: string;
  }>();
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const { session } = useAuth();

  const router = useRouter();
  const parsed = JSON.parse(data);

  const isGooglePlace = (parsed: any): parsed is GooglePlace =>
    parsed && typeof parsed.shortFormattedAddress !== "undefined";

  const place: PlaceDto = isGooglePlace(parsed)
    ? {
        name: parsed.displayName.text,
        google_maps_uri: parsed.googleMapsUri,
        short_formatted_address: parsed.shortFormattedAddress,
        categories: parsed.types,
        google_places_id: parsed.id,
      }
    : parsed;

  if (!place) {
    return <Text>Loading...</Text>;
  }

  if (!place) {
    return <Text>Loading...</Text>;
  }

  const {
    data: placeData,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    placesQuery.placesControllerGetPlaceByGoogleId(place.googlePlaceId)
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />

      <TouchableOpacity onPress={() => router.back()}>
        <Animated.View
          entering={FadeInLeft.springify().delay(800)}
          exiting={FadeOutRight}
          style={{
            padding: 10,
            borderRadius: 99,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            paddingRight: 100,
          }}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity>
        <Animated.View
          entering={FadeInRight.springify().delay(100)}
          exiting={FadeOutRight}
          style={{
            padding: 10,
            borderRadius: 99,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: Colors.dark,
            position: "absolute",
            right: 15,
            bottom: 0,
          }}
        >
          <Text style={Theme.ButtonText}>find</Text>
        </Animated.View>
      </TouchableOpacity>

      <View style={{ flex: 1, gap: 15 }}>
        <View style={{ paddingHorizontal: 15, gap: 5 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Animated.Text
              entering={FadeInLeft.springify()}
              exiting={FadeOutLeft}
              style={Theme.BigTitle}
            >
              {place.name}
            </Animated.Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => Linking.openURL(place.googleMapsUri)}
              style={{
                flex: 1,
                flexDirection: "row",
                position: "relative",
                gap: 5,
                alignItems: "baseline",
              }}
            >
              <FontAwesome name="map-marker" size={20} color={Colors.primary} />
              <Text style={Theme.BodyText}>{place.address}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
          }}
          onLayout={(e) => {
            if (findHeight) {
              e.nativeEvent.layout.height < findHeight &&
                setFindHeight(e.nativeEvent.layout.height);
            } else {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setFindHeight(e.nativeEvent.layout.height);
            }
          }}
        >
          {findHeight ? (
            <Animated.FlatList
              entering={FadeInDown.springify().delay(400)}
              ListFooterComponent={
                <View
                  style={{
                    height: 40,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                    You're up to date!
                  </Text>
                </View>
              }
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: "hidden",
                flexGrow: 1,
              }}
              decelerationRate={"fast"}
              viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
              pagingEnabled={true}
              onRefresh={() => refetch()}
              refreshing={isLoading}
              data={placeData?.finds}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={findHeight - 20}
              renderItem={({ item }) => (
                <Find isProfileFind findHeight={findHeight - 40} find={item} />
              )}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default PlaceDetails;
