import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import { Theme } from "@/constants/Styles";
import Search from "@/components/Search/Search";
import { useQuery } from "@tanstack/react-query";
import Find from "@/components/Find/Find";
import { Divider } from "react-native-elements";
import Categories from "@/components/Categories/Categories";
import { useSupabase } from "@/providers/SupabaseProvider";
import { AllFinds, SingleFind, getAllFindsQuery } from "@/types/queries";

const Page = () => {
  const deviceHeight = useWindowDimensions().height;
  const { profile } = useSupabase();

  const isLiked = (find: SingleFind) => {
    return find.likes.some((item) => item.profile === profile?.id);
  };

  const {
    data: finds,
    isLoading,
    isError,
    refetch,
  } = useQuery<AllFinds>({
    queryKey: ["finds"],
    queryFn: async () => {
      const { data, error } = await getAllFindsQuery;
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <>
      <View style={[Theme.Container, { gap: 10 }]}>
        <SafeAreaView />
        <Search />
        <Categories />
        <View style={{ flex: 1 }}>
          <Divider style={{ marginBottom: 10 }} />
          <FlatList
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
            snapToInterval={deviceHeight * 0.7 + 40}
            ItemSeparatorComponent={() => <View style={{ marginTop: 40 }} />}
            renderItem={({ item }) => (
              <Find
                key={item.id}
                id={item.id}
                rating={item.rating}
                review={item.review}
                photo={item.photos[0]}
                place={item.places}
                profileId={item.user_id}
                profile={item.profile}
                isLiked={isLiked(item)}
              />
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Page;
