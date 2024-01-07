import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  UIManager,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import Search from "@/components/Search/Search";
import { useQuery } from "@tanstack/react-query";
import Find from "@/components/Find/Find";
import Categories from "@/components/Categories/Categories";
import { useSupabase } from "@/providers/SupabaseProvider";
import { AllFindsDto, AllFindsQuery, SingleFindDto } from "@/types/queries";
import { supabase } from "@/utils/supabase";

const Page = () => {
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);
  const { profile } = useSupabase();

  const isLiked = (find: SingleFindDto) => {
    return find.likes.some((item) => item.profile === profile?.id);
  };

  useEffect(() => {
    // Enable layout animation
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);

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
        .order("created_at", { ascending: false });

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
    <View style={{ flex: 1, gap: 15 }}>
      <SafeAreaView />

      <View style={{ paddingHorizontal: 15 }}>
        <Search />
      </View>

      {/* <Categories /> */}

      <View
        style={Theme.Container}
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
        {findHeight && (
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
            snapToInterval={findHeight}
            renderItem={({ item }) => (
              <Find findHeight={findHeight} find={item} />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Page;
