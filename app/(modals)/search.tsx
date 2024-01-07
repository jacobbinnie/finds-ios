import { TextInput, View, useWindowDimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import useGooglePlacesSearch from "@/hooks/useGooglePlacesSearch";
import ProfileSearchResult from "@/components/ProfileSearchResult/ProfileSearchResult";
import PlaceSearchResult from "@/components/PlaceSearchResult/PlaceSearchResult";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
  const deviceHeight = useWindowDimensions().height;

  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: profiles,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["profile_search"],
    queryFn: async () => {
      const response = await supabase.from("profile").select(
        `
        id,
        firstname,
        username,
        image,
        created_at
        `
      );

      return response;
    },
  });

  const {
    data: places,
    isLoading: isPlacesLoading,
    error,
  } = useGooglePlacesSearch(searchQuery);

  useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <View>
      <TextInput
        onChangeText={(e) => setSearchQuery(e)}
        placeholder="Search people, places and foods"
        autoFocus={true}
        style={[
          Theme.Title,
          {
            height: deviceHeight * 0.075,
            backgroundColor: "#FFF",
            paddingHorizontal: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            textAlign: "center",
          },
        ]}
      />

      {places?.places && <Divider />}
      <FlatList
        data={places?.places}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={(place) => {
          return <PlaceSearchResult place={place.item} />;
        }}
      />

      <Divider />
      <FlatList
        data={profiles?.data}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={(item) => {
          return (
            <ProfileSearchResult
              profile={{
                id: item.item.id,
                firstname: item.item.firstname,
                username: item.item.username,
                image: item.item.image,
                created_at: item.item.created_at,
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default Search;
