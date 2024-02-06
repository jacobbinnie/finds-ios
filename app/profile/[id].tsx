import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { Image } from "react-native-elements";
import Find from "@/components/Find/Find";
import { usersQuery } from "@/types/queries";
import { kFormatter } from "@/utils/kFormatter";
import { useAuth } from "@/providers/AuthProvider";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { usersApi } from "@/types";
import Loader from "@/components/Loader/Loader";

const ProfileDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const router = useRouter();
  const { session } = useAuth();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError,
    error,
    refetch: refetchProfile,
  } = useQuery(usersQuery.usersControllerGetProfileAndFinds(Number(id)));

  const {
    data: isFollowing,
    refetch: refetchIsFollowing,
    isLoading: isCheckingFollowing,
  } = useQuery(usersQuery.usersControllerGetFollowStatus(profile?.id!));

  if (isLoadingProfile) {
    return <Loader />;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  if (!profile) {
    return <Text>Profile not found</Text>;
  }

  const handleFollow = async () => {
    if (!session) {
      return router.push("/(modals)/login");
    }

    try {
      await usersApi.usersControllerFollowUser(profile.id, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      refetchIsFollowing();
      refetchProfile();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />

      <TouchableOpacity onPress={() => router.back()}>
        <Animated.View
          entering={FadeInLeft.springify().delay(800)}
          exiting={FadeOutRight}
          style={{
            padding: 10,
            borderRadius: 99,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            paddingRight: 100,
          }}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </Animated.View>
      </TouchableOpacity>

      <View style={{ flex: 1, gap: 15 }}>
        <View style={{ paddingHorizontal: 15, gap: 15 }}>
          <View
            style={{
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
              @{profile.username}
            </Animated.Text>

            <Pressable
              disabled={isCheckingFollowing || isLoadingProfile}
              onPress={handleFollow}
            >
              {isLoadingProfile || isCheckingFollowing ? (
                <ActivityIndicator />
              ) : (
                <Animated.View
                  entering={FadeInRight.springify().delay(100)}
                  exiting={FadeOutRight}
                  style={{
                    padding: 10,
                    borderRadius: 99,
                    overflow: "hidden",
                    backgroundColor: session?.accessToken
                      ? isFollowing
                        ? "transparent"
                        : Colors.dark
                      : Colors.dark,
                    borderWidth: 1,
                    borderColor: Colors.dark,
                  }}
                >
                  <Text
                    style={[
                      Theme.ButtonText,
                      {
                        color: session?.accessToken
                          ? isFollowing
                            ? Colors.dark
                            : Colors.light
                          : Colors.light,
                      },
                    ]}
                  >
                    {session?.accessToken
                      ? isFollowing
                        ? "Following"
                        : "Follow"
                      : "Follow"}
                  </Text>
                </Animated.View>
              )}
            </Pressable>
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 15,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Image
                source={{ uri: profile.avatar }}
                style={{ width: 70, height: 70, borderRadius: 99 }}
              />

              <View
                style={{
                  flex: 1,
                  position: "relative",
                  gap: 5,
                }}
              >
                <Text style={Theme.Title}>{profile.firstname}</Text>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                    {kFormatter(profile.followers)} followers
                  </Text>
                  <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                    {kFormatter(profile.following)} following
                  </Text>
                </View>
              </View>
            </View>

            {profile.bio && profile.bio.length > 1 && (
              <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                {profile.bio}
              </Text>
            )}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
          }}
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
          {findHeight ? (
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
                      justifyContent: "center",
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
                onRefresh={() => refetchProfile()}
                refreshing={isLoadingProfile}
                data={profile.finds}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                snapToInterval={findHeight - 40}
                renderItem={({ item }) => (
                  <Find
                    isProfileFind
                    findHeight={findHeight - 40}
                    find={item}
                  />
                )}
              />
            </View>
          ) : (
            <Loader />
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileDetails;
