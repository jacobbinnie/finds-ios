import {
  TextInput,
  View,
  useWindowDimensions,
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import { useQuery } from "@tanstack/react-query";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import ProfileSearchResult from "@/components/ProfileSearchResult/ProfileSearchResult";
import PlaceSearchResult from "@/components/PlaceSearchResult/PlaceSearchResult";
import { useRouter } from "expo-router";
import { searchQuery } from "@/types/queries";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Search = () => {
  const deviceHeight = useWindowDimensions().height;

  const [query, setQuery] = useState<string>("");

  const router = useRouter();

  const { data, isLoading, isError, error, refetch } = useQuery(
    searchQuery.searchControllerSearch(query)
  );

  // Combine profiles and places into a single array
  const combinedData = [...(data?.profiles ?? []), ...(data?.places ?? [])];

  return (
    <>
      <SafeAreaView />
      <View style={Theme.Container}>
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
          <View
            style={{
              backgroundColor: "#FFF",
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
            <Ionicons name="search" size={20} color={Colors.light} />
            <TextInput
              onChangeText={(e) => setQuery(e)}
              placeholder="Search people & places"
              autoFocus={true}
              style={[
                Theme.BodyText,
                {
                  display: "flex",
                  flexDirection: "row",
                  marginTop: -2,
                },
              ]}
            />
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={Theme.BodyText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={combinedData}
          ItemSeparatorComponent={() => <Divider />}
          onScroll={Keyboard.dismiss}
          renderItem={({ item }) => {
            if ("firstname" in item) {
              // This is a profile item
              return (
                <TouchableOpacity
                  onPress={() => router.replace(`/profile/${item.id}`)}
                >
                  <ProfileSearchResult
                    profile={{
                      id: item.id,
                      firstname: item.firstname,
                      username: item.username,
                      image: item.avatar,
                    }}
                  />
                </TouchableOpacity>
              );
            } else {
              // This is a place item
              return (
                <TouchableOpacity
                  onPress={() =>
                    router.replace({
                      pathname: `/place/${item.id}`,
                      params: {
                        data: JSON.stringify(item),
                      },
                    })
                  }
                >
                  <PlaceSearchResult place={item} />
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </>
  );
};

export default Search;
