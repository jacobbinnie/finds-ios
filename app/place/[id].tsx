import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { GooglePlace } from "@/types/types";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { AllFindsDto, AllFindsQuery } from "@/types/queries";
import Find from "@/components/Find/Find";
import { useSupabase } from "@/providers/SupabaseProvider";

const PlaceDetails = () => {
  const { id, data } = useLocalSearchParams<{ id: string; data: string }>();
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const { profile } = useSupabase();

  const router = useRouter();
  const place = JSON.parse(data) as GooglePlace;

  if (!place) {
    return <Text>Loading...</Text>;
  }

  const {
    data: finds,
    isLoading,
    isError,
    refetch,
  } = useQuery<AllFindsDto>({
    queryKey: ["finds", "explore"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("finds")
        .select(AllFindsQuery)
        .eq("place_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

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
              <Text style={[Theme.BodyText, { color: Colors.grey }]}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (!profile) {
                  return router.push("/(modals)/login");
                } else {
                  router.push({
                    pathname: `/create-find/${id}`,
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
              <Text style={[Theme.BodyText, { color: Colors.light }]}>
                Find
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ display: "flex", gap: 10 }}>
            <TouchableOpacity
              onPress={() => Linking.openURL(place.googleMapsUri)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                gap: 10,
                maxWidth: "75%",
              }}
            >
              <FontAwesome name="map-marker" size={15} color={Colors.primary} />
              <Text numberOfLines={1} style={Theme.BodyText}>
                {place.shortFormattedAddress}
              </Text>
            </TouchableOpacity>
            <Text style={Theme.Title}>{place.displayName.text}</Text>
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
                    That's all {place.displayName.text}'s finds so far
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
              onRefresh={() => refetch()}
              refreshing={isLoading}
              data={finds}
              keyExtractor={(item) => item.id}
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
