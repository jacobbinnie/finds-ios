import {
  SafeAreaView,
  View,
  Text,
  UIManager,
  LayoutAnimation,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";
import Save from "@/components/Save/Save";
import { savesQuery } from "@/types/queries";
import Animated, { FadeInLeft, FadeInDown } from "react-native-reanimated";
import Loader from "@/components/Loader/Loader";
import { FlashList } from "@shopify/flash-list";
import Find from "@/components/Find/Find";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "expo-router";

const Saves = () => {
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Enable layout animation
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);

  const {
    data: saves,
    isLoading,
    isError,
    refetch,
  } = useQuery(savesQuery.savesControllerGetUserSaves());

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <View style={{ flex: 1, gap: 15 }}>
      <SafeAreaView />
      <StatusBar style="dark" />

      {/* <Categories /> */}

      <View
        style={[Theme.Container, { marginTop: 5 }]}
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
        <Animated.Text
          entering={FadeInLeft.springify()}
          style={[Theme.BigTitle, { marginBottom: 15 }]}
        >
          Your saves
        </Animated.Text>

        {saves?.length === 0 && (
          <Animated.Text
            entering={FadeInLeft.springify().delay(100)}
            style={Theme.BodyText}
          >
            You have no saves
          </Animated.Text>
        )}

        {findHeight && (
          <View
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              overflow: "hidden",
              flexGrow: 1,
            }}
          >
            <FlashList
              estimatedItemSize={findHeight / 2}
              decelerationRate={"fast"}
              viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
              pagingEnabled={true}
              onRefresh={() => refetch()}
              refreshing={isLoading}
              data={saves}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={findHeight / 1.75}
              renderItem={({ item }) => (
                <Find
                  findHeight={findHeight / 1.75}
                  find={{
                    id: item.find.id,
                    category: item.find.category,
                    createdAt: item.find.createdAt,
                    images: item.find.images,
                    place: item.find.place,
                    review: item.find.review,
                    tags: item.find.tags,
                    user: item.find.user,
                  }}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Saves;
