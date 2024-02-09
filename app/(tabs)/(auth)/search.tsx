import {
  TextInput,
  View,
  useWindowDimensions,
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import { useQuery } from "@tanstack/react-query";
import { Divider } from "react-native-elements";
import ProfileSearchResult from "@/components/ProfileSearchResult/ProfileSearchResult";
import PlaceSearchResult from "@/components/PlaceSearchResult/PlaceSearchResult";
import { useRouter } from "expo-router";
import { searchQuery } from "@/types/queries";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutRight,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";

const Search = () => {
  const deviceHeight = useWindowDimensions().height;
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");

  const router = useRouter();

  const { data, isLoading, isError, error, refetch } = useQuery(
    searchQuery.searchControllerSearch(query)
  );

  // Combine profiles and places into a single array
  const combinedData = [...(data?.profiles ?? []), ...(data?.places ?? [])];

  return (
    <View style={[Theme.Container, { backgroundColor: "#FFF" }]}>
      <SafeAreaView />
      <StatusBar style="dark" />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15,
        }}
      >
        {isSearching ? (
          <View
            style={{
              width: 200,
              backgroundColor: Colors.light,
              padding: 10,
              borderRadius: 10,
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              flex: 1,
            }}
          >
            <Ionicons name="search" size={20} color={Colors.grey} />
            <TextInput
              onChangeText={(e) => setQuery(e)}
              placeholder="Search people & places"
              autoFocus={true}
              focusable={isSearching}
              style={[
                Theme.BodyText,
                {
                  display: "flex",
                  flexDirection: "row",
                  marginTop: -2,
                  color: Colors.grey,
                },
              ]}
            />
          </View>
        ) : (
          <Animated.View
            entering={FadeInLeft}
            exiting={FadeOutRight}
            onTouchStart={() => setIsSearching(true)}
            style={{
              width: 400,
              backgroundColor: Colors.light,
              padding: 10,
              borderRadius: 10,
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              flex: 1,
            }}
          >
            <Ionicons name="search" size={20} color={Colors.grey} />
            <Text
              style={[Theme.BodyText, { color: Colors.grey, marginTop: 2 }]}
            >
              Search people & places
            </Text>
          </Animated.View>
        )}

        {isSearching && (
          <TouchableOpacity
            onPress={() => {
              setIsSearching(false);
              setQuery("");
            }}
          >
            <Animated.Text
              entering={FadeInRight}
              exiting={FadeOutRight}
              style={Theme.BodyText}
            >
              Cancel
            </Animated.Text>
          </TouchableOpacity>
        )}
      </View>

      <FlashList
        estimatedItemSize={25}
        data={combinedData}
        ItemSeparatorComponent={() => <Divider />}
        onScroll={Keyboard.dismiss}
        renderItem={({ item }) => {
          if ("firstname" in item) {
            // This is a profile item
            return (
              <TouchableOpacity
                onPress={() => router.push(`/profile/${item.id}`)}
              >
                <ProfileSearchResult
                  profile={{
                    id: item.id,
                    firstname: item.firstname,
                    username: item.username,
                    avatar: item.avatar,
                  }}
                />
              </TouchableOpacity>
            );
          } else {
            // This is a place item
            return (
              <TouchableOpacity
                onPress={() => {
                  const stringedPlace = JSON.stringify(item);

                  router.push({
                    pathname: `/place/${item.id}`,
                    params: { data: stringedPlace },
                  });
                }}
              >
                <PlaceSearchResult place={item} />
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

export default Search;
