import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
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

const ProfileDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const router = useRouter();
  const { session } = useAuth();

  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(usersQuery.usersControllerGetProfileAndFinds(Number(id)));

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  if (!profile) {
    return <Text>Profile not found</Text>;
  }

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

            <TouchableOpacity>
              <Animated.View
                entering={FadeInRight.springify().delay(100)}
                exiting={FadeOutRight}
                style={{
                  padding: 10,
                  borderRadius: 99,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: Colors.dark,
                }}
              >
                <Text style={Theme.ButtonText}>Follow</Text>
              </Animated.View>
            </TouchableOpacity>
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

                <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                  {kFormatter(profile.followers)} followers
                </Text>
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
            <Animated.FlatList
              entering={FadeInDown.springify().delay(400)}
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
              data={profile.finds}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={findHeight - 20}
              renderItem={({ item }) => (
                <Find isProfileFind findHeight={findHeight - 40} find={item} />
              )}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileDetails;
