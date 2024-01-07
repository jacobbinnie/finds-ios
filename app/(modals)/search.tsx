import { TextInput, View, useWindowDimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { FlatList } from "react-native-gesture-handler";
import SearchResult from "@/components/SearchResult/SearchResult";
import { Divider } from "react-native-elements";
import useGooglePlacesSearch from "@/hooks/useGooglePlacesSearch";

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
    data,
    isLoading: isGooglePlacesLoading,
    error,
  } = useGooglePlacesSearch(searchQuery);

  useEffect(() => {
    if (data?.places) {
      console.log(data?.places[0]);
    }
  }, [data]);

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
        style={{
          height: deviceHeight * 0.075,
          backgroundColor: "#FFF",
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      />

      <Divider />
      <FlatList
        data={profiles?.data}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={(item) => {
          return (
            <SearchResult
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
