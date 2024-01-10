import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Theme } from "@/constants/Styles";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
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
  profileFind?: boolean;
  findHeight: number;
  find: SingleFindDto;
}

const Find = ({ profileFind, findHeight, find }: FindProps) => {
  const router = useRouter();
  const { profile } = useSupabase();

  const {
    data: existingSave,
    refetch: refetchSave,
    isLoading: isLoadingSave,
  } = useQuery({
    queryKey: ["saves", "find", find.id],
    queryFn: async () => {
      if (!profile) return null;

      const { data, error } = await supabase
        .from("saves")
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

      if (action === FindAction.FIND) {
        // do something
      }

      if (action === FindAction.SAVE) {
        if (existingSave) {
          const { error } = await supabase
            .from("saves")
            .delete()
            .eq("id", existingSave.id);

          if (error) throw error;

          await refetchSave();
        } else {
          const { error } = await supabase.from("saves").insert([
            {
              profile: profile.id,
              find: find.id,
            },
          ]);

          if (error) throw error;

          await refetchSave();
        }
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
          backgroundColor: Colors.light,
          elevation: 4,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            router.push({
              pathname: `/find-details/${find.id}`,
              params: {
                data: JSON.stringify(find),
              },
            })
          }
        >
          <View
            style={{
              display: profileFind ? "none" : "flex",
              position: "absolute",
              zIndex: 10,
              top: 15,
              left: 15,
              backgroundColor: Colors.light,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              onPress={() => router.push(`/profile/${find.profile?.id}`)}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
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
                  fontSize: 16,
                }}
              >
                {`Find by @${find.profile?.username}`}
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            style={{
              width: "100%",
              height: findHeight * 0.675,
              objectFit: "cover",
            }}
            source={{ uri: find.photos[0] }}
          />
          <View
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              paddingHorizontal: 15,
              backgroundColor: "#FFF",
              borderEndStartRadius: 10,
              borderEndEndRadius: 10,
              overflow: "hidden",
            }}
          >
            <View style={{ gap: 10, paddingVertical: 15 }}>
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: 10,
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
                    width: 35,
                    height: 35,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.primary,
                    borderRadius: 99,
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                >
                  <Text style={[Theme.Title, { color: Colors.light }]}>
                    {find.rating}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={Theme.Title}>{find.places?.name}</Text>
              </View>
              <Text numberOfLines={2} style={Theme.BodyText}>
                {find.review}
              </Text>
            </View>

            <Divider />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <Text style={[Theme.BodyText, { color: Colors.grey }]}>
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

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <TouchableOpacity onPress={() => handleAction(FindAction.SAVE)}>
                  <Ionicons
                    name="ios-heart"
                    size={findHeight * 0.05}
                    color={existingSave ? Colors.primary : Colors.light}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAction(FindAction.FIND)}>
                  <Entypo
                    name="loop"
                    size={findHeight * 0.05}
                    color={Colors.light}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Find;
