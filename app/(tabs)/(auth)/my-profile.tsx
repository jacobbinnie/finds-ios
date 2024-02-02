import {
  SafeAreaView,
  View,
  Text,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Theme } from "@/constants/Styles";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";
import { usersQuery } from "@/types/queries";
import { useRouter } from "expo-router";
import Find from "@/components/Find/Find";
import { Image } from "react-native-elements";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  FadeInDown,
} from "react-native-reanimated";
import { kFormatter } from "@/utils/kFormatter";
import Loader from "@/components/Loader/Loader";
import { FlashList } from "@shopify/flash-list";

const MyProfile = () => {
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const { session, signout } = useAuth();

  const router = useRouter();

  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    usersQuery.usersControllerGetProfileAndFinds(session?.profile.id!)
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  if (!profile) {
    return <Text>Profile not found</Text>;
  }

  return (
    <View style={{ flex: 1, gap: 15 }}>
      <SafeAreaView />

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
          <Animated.View
            entering={FadeInRight.springify()}
            exiting={FadeOutRight}
          >
            <TouchableOpacity
              onPress={() => signout()}
              style={{
                borderColor: Colors.grey,
                borderWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 5,
                gap: 5,
                borderRadius: 99,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[Theme.ButtonText, { color: Colors.grey }]}>
                Sign out
              </Text>
            </TouchableOpacity>
          </Animated.View>
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
              source={{ uri: session?.profile.avatar }}
              style={{ width: 70, height: 70, borderRadius: 99 }}
            />

            <View
              style={{
                flex: 1,
                position: "relative",
                gap: 5,
              }}
            >
              <Text style={Theme.Title}>{session?.profile.firstname}</Text>

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

        <Animated.View
          entering={FadeInDown.springify().delay(50)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 15,
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: Colors.grey,
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 5,
              gap: 5,
              flex: 1,
              borderRadius: 99,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[Theme.ButtonText, { color: Colors.grey }]}>
              Edit profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.dark,
              paddingHorizontal: 15,
              paddingVertical: 5,
              gap: 5,
              flex: 1,
              borderRadius: 99,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[Theme.ButtonText, { color: Colors.light }]}>
              Share profile
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
              onRefresh={() => refetch()}
              refreshing={isLoading}
              data={profile.finds}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={findHeight - 40}
              renderItem={({ item }) => (
                <Find isProfileFind findHeight={findHeight - 40} find={item} />
              )}
            />
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

export default MyProfile;
