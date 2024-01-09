import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { Divider, Image } from "react-native-elements";
import { SingleFindDto } from "@/types/queries";
import {
  format,
  isThisHour,
  isThisMinute,
  isToday,
  isYesterday,
} from "date-fns";
import { FindAction } from "@/types/types";
import { useSupabase } from "@/providers/SupabaseProvider";

const FindDetails = () => {
  const { id, data } = useLocalSearchParams<{ id: string; data: string }>();
  const router = useRouter();

  const deviceHeight = useWindowDimensions().height;
  const find = JSON.parse(data) as SingleFindDto;
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
      id={id}
      style={{
        width: "100%",
        height: deviceHeight ?? 0,
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
          onPress={() => router.replace(`/place/${find.places?.id}`)}
          style={{
            backgroundColor: Colors.light,
            paddingHorizontal: 15,
            paddingVertical: 10,
            gap: 5,
            borderRadius: 99,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            right: 15,
            top: 15,
            zIndex: 20,
          }}
        >
          <Text style={Theme.BodyText}>See place details</Text>
          <Ionicons
            name="arrow-forward-outline"
            size={24}
            color={Colors.dark}
          />
        </TouchableOpacity>

        <Image
          style={{
            width: "100%",
            height: deviceHeight * 0.5,
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
          <View
            style={{
              display: "flex",
              zIndex: 10,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: Colors.light,
              borderRadius: 10,
              padding: 15,
              marginTop: 15,
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
                  style={{ width: 45, height: 45, borderRadius: 99 }}
                />
              )}

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View style={{ gap: 5 }}>
                  <Text
                    style={Theme.BodyText}
                  >{`${find.profile?.firstname}`}</Text>
                  <Text
                    style={[Theme.BodyText, { color: Colors.grey }]}
                  >{`@${find.profile?.username}`}</Text>
                </View>
                <Text style={Theme.BodyText}>{`21 finds`}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 10, paddingVertical: 15 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                gap: 10,
              }}
            >
              <FontAwesome name="map-marker" size={15} color={Colors.primary} />
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
              <Text style={Theme.Title}>{find.rating}</Text>
            </View>
            <Text style={Theme.BodyText}>{find.review}</Text>
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
                  size={deviceHeight * 0.035}
                  color={existingSave ? Colors.primary : Colors.light}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAction(FindAction.FIND)}>
                <Entypo
                  name="loop"
                  size={deviceHeight * 0.035}
                  color={Colors.light}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FindDetails;
