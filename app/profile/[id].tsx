import { View, Text, TouchableOpacity, LayoutAnimation } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import { ProfileDetailsQuery, ProfileDetailsDto } from "@/types/queries";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { Image } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import Find from "@/components/Find/Find";

const ProfileDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const router = useRouter();

  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery<ProfileDetailsDto>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profile")
        .select(ProfileDetailsQuery)
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        throw error;
      }
      return data;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  if (!profile) {
    return <Text>Profile not found</Text>;
  }

  const finds = profile.finds;

  return (
    <View style={Theme.Container}>
      <SafeAreaView />

      <View style={{ gap: 10 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 35,
              height: 35,
              borderRadius: 99,
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Image
            source={{ uri: profile.image ?? undefined }}
            style={{ width: 100, height: 100, borderRadius: 99 }}
          />
          <View style={{ width: 35, height: 35 }} />
        </View>

        <View style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Text style={Theme.Title}>{profile.firstname}</Text>
          <Text style={[Theme.BodyText, { color: Colors.grey }]}>
            @{profile.username}
          </Text>
          <Text style={[Theme.BodyText, { color: Colors.grey }]}>
            1.4k followers
          </Text>
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
          {/* {findHeight && (
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
          )} */}
        </View>
      </View>
    </View>
  );
};

export default ProfileDetails;
