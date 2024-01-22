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

const PlaceDetails = () => {
  const { id, data } = useLocalSearchParams<{
    id: string;
    data: string;
    searchData: string;
  }>();
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const { profile } = useAuth();

  const router = useRouter();
  const parsed = JSON.parse(data);

  const isGooglePlace = (parsed: any): parsed is GooglePlace =>
    parsed && typeof parsed.shortFormattedAddress !== "undefined";

  const place: Place = isGooglePlace(parsed)
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
    placesQuery.placesControllerGetPlaceByGoogleId(place.google_places_id)
  );

  return (
    <View style={Theme.Container}>
      <SafeAreaView />

      <View style={{ gap: 20, flex: 1 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                borderColor: Colors.grey,
                borderWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 10,
                gap: 5,
                borderRadius: 99,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={Colors.grey}
              />
              <Text style={[Theme.ButtonText, { color: Colors.grey }]}>
                Back
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (!profile) {
                  return router.push("/(modals)/login");
                } else {
                  router.push({
                    pathname: `/new-find/${id}`,
                    params: { data: JSON.stringify(place) },
                  });
                }
              }}
              style={{
                backgroundColor: Colors.dark,
                paddingHorizontal: 15,
                paddingVertical: 10,
                gap: 5,
                borderRadius: 99,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="add" size={24} color={Colors.light} />
              <Text style={[Theme.ButtonText, { color: Colors.light }]}>
                Find
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ display: "flex", gap: 10 }}>
            <Text style={Theme.Title}>{place?.name ?? place?.name}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(place?.google_maps_uri)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                gap: 5,
                maxWidth: "75%",
              }}
            >
              <FontAwesome name="map-marker" size={15} color={Colors.primary} />
              <Text
                numberOfLines={1}
                style={[Theme.Caption, { color: Colors.grey }]}
              >
                {place?.short_formatted_address}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
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
            <FlatList
              ListEmptyComponent={<Text>No finds yet</Text>}
              ListFooterComponent={
                <View
                  style={{
                    height: 40,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                    That's all {place.name}'s finds so far
                  </Text>
                </View>
              }
              style={{
                borderRadius: 10,
                overflow: "hidden",
                flexGrow: 1,
              }}
              decelerationRate={"fast"}
              viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
              pagingEnabled={true}
              refreshing={isLoading}
              onRefresh={() => refetch()}
              data={placeData?.data.finds}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={findHeight - 40}
              renderItem={({ item }) => (
                <Find profileFind findHeight={findHeight - 40} find={item} />
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
