import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Theme } from "@/constants/Styles";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { SingleFindDto } from "@/types/queries";
import { FindAction } from "@/types/types";
import { useSupabase } from "@/providers/SupabaseProvider";
import { supabase } from "@/utils/supabase";
import { Query, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  format,
  isThisMinute,
  isThisHour,
  isToday,
  isYesterday,
} from "date-fns";
import { Divider } from "react-native-elements";

interface FindProps {
  findHeight: number;
  find: SingleFindDto;
}

const Find = ({ findHeight, find }: FindProps) => {
  const router = useRouter();
  const { profile } = useSupabase();

  const {
    data: existingLike,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["likes", "find", find.id],
    queryFn: async () => {
      if (!profile) return null;

      const { data, error } = await supabase
        .from("likes")
        .select("id")
        .eq("find", find.id)
        .eq("profile", profile.id);

      if (error) throw error;

      return data?.[0] ?? null;
    },
  });

  const handleAction = async (action: FindAction) => {
    try {
      if (!profile) {
        return router.push("/(modals)/login");
      }

      if (action === FindAction.LIKE) {
        if (existingLike) {
          const { error } = await supabase
            .from("likes")
            .delete()
            .eq("id", existingLike.id);

          if (error) throw error;

          await refetch();
        } else {
          const { error } = await supabase.from("likes").insert([
            {
              profile: profile.id,
              find: find.id,
            },
          ]);

          if (error) throw error;

          await refetch();
        }
      }

      if (action === FindAction.SAVE) {
        console.log("SAVE");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      id={find.id}
      style={{
        width: "100%",
        height: findHeight ?? 0,
      }}
    >
      <View
        style={{
          display: "flex",
          position: "relative",
          height: "100%",
          borderRadius: 10,
          overflow: "hidden",
          shadowColor: Colors.grey,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.62,
          elevation: 4,
        }}
      >
        <TouchableOpacity onPress={() => router.push(`/find/${find.id}`)}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              zIndex: 10,
              top: 10,
              left: 10,
              backgroundColor: Colors.light,
              paddingHorizontal: 7,
              paddingVertical: 7,
              borderRadius: 10,
              overflow: "hidden",
              gap: 7,
              alignItems: "center",
            }}
          >
            {find.profile?.image && (
              <Image
                source={{ uri: find.profile?.image }}
                style={{ width: 25, height: 25, borderRadius: 99 }}
              />
            )}
            <Text
              style={{
                fontFamily: "font-m",
              }}
            >
              {`Find by @${find.profile?.username}`}
            </Text>
          </View>

          <Image
            style={{
              width: "100%",
              height: findHeight * 0.5,
              objectFit: "cover",
            }}
            source={{ uri: find.photos[0] }}
          />
          <View
            style={{
              height: findHeight * 0.25,
              display: "flex",
              justifyContent: "space-evenly",
              paddingHorizontal: 10,
              backgroundColor: "#FFF",
              borderEndStartRadius: 10,
              borderEndEndRadius: 10,
              overflow: "hidden",
            }}
          >
            <View style={{ gap: 10 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  gap: 7,
                }}
              >
                <FontAwesome
                  name="map-marker"
                  size={15}
                  color={Colors.primary}
                />
                <Text style={Theme.BodyText}>{find.places?.locality}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={Theme.Title}>{find.places?.name}</Text>
                <Text style={Theme.Title}>{find.rating}/10</Text>
              </View>
              <Text style={Theme.BodyText}>{find.review}</Text>
            </View>

            <Divider />

            <View>
              <Text
                style={[
                  ,
                  {
                    backgroundColor: "#FFF",
                  },
                ]}
              >
                {isThisMinute(find.created_at)
                  ? "Just now"
                  : isThisHour(find.created_at)
                  ? "In the past hour"
                  : isToday(find.created_at)
                  ? "Today"
                  : isYesterday(find.created_at)
                  ? "Yesterday"
                  : format(new Date(find.created_at), "MMM dd, yyyy")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => handleAction(FindAction.SAVE)}
            style={{
              backgroundColor: "#FFF",
              display: "flex",
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 99,
              shadowColor: Colors.light,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            <Ionicons name="ios-heart" size={35} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAction(FindAction.LIKE)}
            style={{
              backgroundColor: existingLike ? Colors.primary : "#FFF",
              display: "flex",
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 99,
              shadowColor: Colors.light,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            <AntDesign name="like1" size={35} color={Colors.light} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Find;
