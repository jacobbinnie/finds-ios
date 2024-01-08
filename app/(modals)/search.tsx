import {
  TextInput,
  View,
  useWindowDimensions,
  Text,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import useGooglePlacesSearch from "@/hooks/useGooglePlacesSearch";
import ProfileSearchResult from "@/components/ProfileSearchResult/ProfileSearchResult";
import PlaceSearchResult from "@/components/PlaceSearchResult/PlaceSearchResult";
import { ProfileSearchDto, ProfileSearchQuery } from "@/types/queries";
import { useRouter } from "expo-router";

const Search = () => {
  const deviceHeight = useWindowDimensions().height;

  const [searchQuery, setSearchQuery] = useState<string>("");

  const router = useRouter();

  const {
    data: profiles,
    isLoading,
    isError,
    refetch,
  } = useQuery<ProfileSearchDto>({
    queryKey: ["profile_search"],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 3) {
        return [];
      }

      const { data, error } = await supabase
        .from("profile")
        .select(ProfileSearchQuery)
        .ilike("username", `%${searchQuery}%`);

      if (error) throw error;
      return data;
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

  // Combine profiles and places into a single array
  const combinedData = [
    ...(profiles || []), // Add profiles
    ...(places?.places || []), // Add places
  ].sort((a, b) => {
    if ("firstname" in a) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        onChangeText={(e) => setSearchQuery(e)}
        placeholder="Search people, places and foods"
        autoFocus={true}
        style={[
          Theme.BodyText,
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

      {combinedData && (
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
                      image: item.image,
                      created_at: item.created_at,
                    }}
                  />
                </TouchableOpacity>
              );
            } else {
              // This is a place item
              return (
                <TouchableOpacity
                  onPress={() => router.replace(`/place/${item.id}`)}
                >
                  <PlaceSearchResult place={item} />
                </TouchableOpacity>
              );
            }
          }}
        />
      )}
    </View>
  );
};

export default Search;
