import { View, Text, TouchableOpacity, LayoutAnimation } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { Image } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import Find from "@/components/Find/Find";

const PlaceDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const router = useRouter();

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
                backgroundColor: Colors.grey,
                padding: 10,
                gap: 5,
                borderRadius: 99,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
              <Text
                style={[
                  Theme.BodyText,
                  { color: Colors.light, textAlign: "center" },
                ]}
              >
                Back
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.dark,
                padding: 10,

                borderRadius: 99,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign name="plus" size={24} color="white" />
              <Text
                style={[
                  Theme.BodyText,
                  { color: Colors.light, textAlign: "center", padding: 10 },
                ]}
              >
                Find
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
              source={{ uri: undefined }}
              style={{ width: 70, height: 70, borderRadius: 99 }}
            />

            <View
              style={{
                flex: 1,
                position: "relative",
                gap: 5,
              }}
            >
              <Text style={Theme.Title}>{id}</Text>
              <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                location
              </Text>
              <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                address
              </Text>
            </View>
          </View>
        </View>

        {/* <View
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
                    That's all place name's finds so far
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
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              snapToInterval={findHeight - 40}
              renderItem={({ item }) => (
                <Find profileFind findHeight={findHeight - 40} find={item} />
              )}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </View> */}
      </View>
    </View>
  );
};

export default PlaceDetails;
