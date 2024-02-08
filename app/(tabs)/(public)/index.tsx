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
import { TouchableOpacity } from "react-native-gesture-handler";
import { set } from "date-fns";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";

const Page = () => {
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);
  const [tab, setTab] = useState<"following" | "all">("all");

  const { session } = useAuth();

  useEffect(() => {
    // Enable layout animation
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);

  const {
    data: followingFinds,
    isLoading: followingFindsLoading,
    isError: followingFindsError,
    error: followingFindsErrorObject,
    refetch: refetchFollowingFinds,
  } = useQuery(findsQuery.findsControllerFollowingFinds());

  const {
    data: finds,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(findsQuery.findsControllerAllFinds());

  useEffect(() => {
    if (tab === "following") {
      refetchFollowingFinds();
    } else {
      refetch();
    }
  }, [tab]);

  if (isLoading || (session?.accessToken && followingFindsLoading)) {
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
          style={[
            Theme.BigTitle,
            {
              fontFamily: "font-serif",
              paddingHorizontal: 5,
            },
          ]}
        >
          finds.nyc
        </Animated.Text>
      </View>

      <View
        style={{
          paddingHorizontal: 15,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setTab("all")}
          style={{
            backgroundColor: tab === "all" ? Colors.dark : Colors.light,
            borderWidth: tab === "all" ? 0 : 1,
            borderColor: Colors.dark,
            padding: 10,
            borderRadius: 99,
          }}
        >
          <Text
            style={[
              Theme.Caption,
              { color: tab === "all" ? Colors.light : Colors.dark },
            ]}
          >
            All NYC
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!session?.accessToken) {
              router.push("/(modals)/login");
            } else {
              setTab("following");
            }
          }}
          style={{
            backgroundColor: tab === "following" ? Colors.dark : Colors.light,
            borderWidth: tab === "following" ? 0 : 1,
            borderColor: Colors.dark,
            padding: 10,
            borderRadius: 99,
          }}
        >
          <Text
            style={[
              Theme.Caption,
              {
                color: tab === "following" ? Colors.light : Colors.dark,
              },
            ]}
          >
            Following
          </Text>
        </TouchableOpacity>
      </View>

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
                data={tab === "all" ? finds : followingFinds}
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
