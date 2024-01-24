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
  } = useQuery(usersQuery.usersControllerGetProfileAndFinds(id));

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
    <View style={Theme.Container}>
      <SafeAreaView />

      <View style={{ gap: 20, flex: 1 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                borderColor: Colors.grey,
                borderWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 10,
                gap: 5,
                borderRadius: 99,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={Colors.grey}
              />
              <Text style={[Theme.ButtonText, { color: Colors.grey }]}>
                Back
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.dark,
                paddingHorizontal: 15,
                paddingVertical: 10,
                gap: 5,
                borderRadius: 99,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={[Theme.ButtonText, { color: Colors.light }]}>
                Follow
              </Text>
            </TouchableOpacity>
          </View>

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
                @{profile.username}
              </Text>
              <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                {`${kFormatter(profile.followers)} followers`}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
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
            <FlatList
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
                    That's all {"User's name here"}'s finds so far
                  </Text>
                </View>
              }
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
              data={profile.finds}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={findHeight - 40}
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
