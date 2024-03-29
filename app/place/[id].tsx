import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Linking,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { useQuery } from "@tanstack/react-query";
import Find from "@/components/Find/Find";
import { useAuth } from "@/providers/AuthProvider";
import { placesQuery } from "@/types/queries";
import { GooglePlaceDto, PlaceDto } from "@/types/generated";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import Loader from "@/components/Loader/Loader";
import { StatusBar } from "expo-status-bar";

const PlaceDetails = () => {
  const { id, data } = useLocalSearchParams<{
    id: string;
    data: string;
  }>();
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const { session } = useAuth();

  const router = useRouter();

  if (!data) {
    return null;
  }

  const parsed = JSON.parse(data);

  const isGooglePlace = (parsed: any): parsed is GooglePlaceDto =>
    parsed && typeof parsed.shortFormattedAddress !== "undefined";

  const place: PlaceDto = isGooglePlace(parsed)
    ? {
        id: parsed.id,
        name: parsed.displayName.text,
        address: parsed.shortFormattedAddress,
        googleMapsUri: parsed.googleMapsUri,
        googlePlaceId: parsed.id,
      }
    : parsed;

  if (!place) {
    return <Loader />;
  }

  const {
    data: placeData,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    placesQuery.placesControllerGetPlaceByGoogleId(place.googlePlaceId)
  );

  const handleAddNewFind = () => {
    if (!session) {
      return router.push("/(modals)/login");
    }

    router.push({
      pathname: `/new-find/${place.googlePlaceId}`,
    });
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [id])
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView edges={["top", "left", "right"]}>
        <StatusBar style="dark" />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            marginTop: 15,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Animated.View
              entering={FadeInLeft.springify().delay(800)}
              exiting={FadeOutRight}
              style={{
                borderRadius: 99,
                overflow: "hidden",
                paddingRight: 100,
              }}
            >
              <Ionicons name="arrow-back" size={30} color="black" />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAddNewFind}>
            <Animated.View
              entering={FadeInRight.springify().delay(100)}
              exiting={FadeOutRight}
              style={{
                borderWidth: 1,
                padding: 10,
                gap: 5,
                borderRadius: 99,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={[Theme.Caption, { color: Colors.dark }]}>
                Add new find
              </Text>
              <Feather name="plus" size={15} color={Colors.dark} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={{ flex: 1, gap: 15, paddingTop: 10 }}>
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
                gap: 10,
                alignItems: "baseline",
              }}
            >
              <FontAwesome name="map-marker" size={20} color={Colors.dark} />
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
            <View
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: "hidden",
                flexGrow: 1,
              }}
            >
              <FlashList
                estimatedItemSize={findHeight - 40}
                ListFooterComponent={
                  <View
                    style={{
                      height: 40,
                      width: "100%",
                      display: placeData?.finds ? "flex" : "none",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                      You're up to date!
                    </Text>
                  </View>
                }
                decelerationRate={"fast"}
                viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
                pagingEnabled={true}
                onRefresh={() => refetch()}
                refreshing={isLoading}
                data={placeData?.finds}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                snapToInterval={findHeight - 20}
                ListEmptyComponent={
                  <View
                    style={{
                      height: findHeight - 40,
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: 10,
                    }}
                  >
                    <Text style={Theme.Title}>
                      Yoooooooo {session?.profile.firstname}! You're the first
                      one here 🎉 Go ahead and add your find!
                    </Text>
                  </View>
                }
                renderItem={({ item }) => (
                  <Find isPlaceFind findHeight={findHeight - 40} find={item} />
                )}
              />
            </View>
          ) : (
            <Loader />
          )}
        </View>
      </View>
    </View>
  );
};

export default PlaceDetails;
