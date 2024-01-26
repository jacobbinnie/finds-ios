import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import Search from "@/components/Search/Search";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";
import Save from "@/components/Save/Save";
import { savesQuery, usersQuery } from "@/types/queries";
import { kFormatter } from "@/utils/kFormatter";
import { Image } from "react-native-elements";
import { useRouter } from "expo-router";
import Find from "@/components/Find/Find";

const MyProfile = () => {
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const router = useRouter();
  const { session } = useAuth();

  if (!session?.profile.id) {
    return null;
  }

  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    usersQuery.usersControllerGetProfileAndFinds(session?.profile.id)
  );

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
    <View style={{ flex: 1, gap: 15 }}>
      <SafeAreaView />

      <View style={{ paddingHorizontal: 15, gap: 15 }}>
        <Text style={Theme.BigTitle}>my profile</Text>
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
              <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                @{session?.profile.username}
              </Text>
              <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                200 followers
              </Text>
            </View>
          </View>
        </View>

        <View
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
              paddingVertical: 10,
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
              paddingVertical: 10,
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
                  That's all your finds so far
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
  );
};

export default MyProfile;
