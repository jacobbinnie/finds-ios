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
import { useQuery } from "@tanstack/react-query";
import Find from "@/components/Find/Find";
import Colors from "@/constants/Colors";
import { findsQuery } from "@/types/queries";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import FindSkeleton from "@/components/Find/FindSkeleton";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  FadeInUp,
  FadeInDown,
} from "react-native-reanimated";

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
    return <Text>Loading...</Text>;
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
          finds.nyc
        </Animated.Text>
        <TouchableOpacity>
          <Animated.View
            entering={FadeInRight.springify().delay(100)}
            exiting={FadeOutRight}
          >
            <Feather name="plus-square" size={30} color="black" />
          </Animated.View>
        </TouchableOpacity>
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
            <Animated.FlatList
              entering={FadeInDown.springify().delay(50)}
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
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: "hidden",
                flexGrow: 1,
              }}
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
          ))}
      </View>
    </View>
  );
};

export default Page;
