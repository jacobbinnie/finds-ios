import { SafeAreaView, View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Theme } from "@/constants/Styles";
import Search from "@/components/Search/Search";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import Find from "@/components/Find/Find";
import { Divider } from "react-native-elements";

const Page = () => {
  const {
    data: finds,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["finds"],
    queryFn: async () => {
      const response = await supabase.from("finds").select(
        `
        id,
        rating,
        review,
        photos,
        places (
          name,
          id
        ),
        profile (
          id,
          firstname,
          username
        )
        `
      );
      return response;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>; // Optional loading state
  }

  if (isError) {
    return <Text>Error fetching data</Text>; // Optional error state
  }

  return (
    <View style={Theme.Container}>
      <SafeAreaView />
      <Search />
      <View style={{ height: "100%" }}>
        <Divider style={{ marginBottom: 10 }} />
        <FlatList
          snapToAlignment={"start"}
          viewabilityConfig={{ itemVisiblePercentThreshold: 90 }}
          pagingEnabled={true}
          onRefresh={() => refetch()}
          refreshing={isLoading}
          data={finds?.data}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Find
              key={item.id}
              id={item.id}
              rating={item.rating}
              review={item.review}
              photo={item.photos[0]}
              place={item.places}
              profile={item.profile}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Page;
