import {
  SafeAreaView,
  View,
  Text,
  UIManager,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import { useQuery } from "@tanstack/react-query";
import Find from "@/components/Find/Find";
import Colors from "@/constants/Colors";
import { findsQuery } from "@/types/queries";
import FindSkeleton from "@/components/Find/FindSkeleton";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import Loader from "@/components/Loader/Loader";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";

const Page = () => {
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Enable layout animation
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);

  const {
    data: finds,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(findsQuery.findsControllerAllFinds());

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text style={{ paddingTop: 100 }}>{error.message}</Text>;
  }

  return (
    <View style={{ flex: 1, gap: 15 }}>
      <SafeAreaView />

      <View
        style={{
          paddingHorizontal: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Animated.Text
          entering={FadeInLeft.springify()}
          exiting={FadeOutLeft}
          style={Theme.BigTitle}
        >
          finds
        </Animated.Text>
        <Text style={Theme.Title}>new york city</Text>
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
        {findHeight &&
          (isLoading ? (
            <FindSkeleton findHeight={findHeight - 40} />
          ) : (
            <View
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: "hidden",
                flexGrow: 1,
              }}
            >
              <FlashList
                estimatedItemSize={findHeight - 40}
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
                      You're up to date!
                    </Text>
                  </View>
                }
                decelerationRate={"fast"}
                viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
                pagingEnabled={true}
                onRefresh={() => refetch()}
                refreshing={isLoading}
                data={finds}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                snapToInterval={findHeight - 40}
                renderItem={({ item }) => (
                  <Find findHeight={findHeight - 40} find={item} />
                )}
              />
            </View>
          ))}
      </View>
    </View>
  );
};

export default Page;
