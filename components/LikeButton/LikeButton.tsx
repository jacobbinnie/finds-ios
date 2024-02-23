import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { likesQuery } from "@/types/queries";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { likesApi } from "@/types";
import Toast from "react-native-root-toast";
import { Theme } from "@/constants/Styles";

const LikeButton = ({ findId }: { findId: number }) => {
  const { session } = useAuth();
  const router = useRouter();

  const {
    data: like,
    refetch: refetchLike,
    error,
    isLoading,
  } = useQuery(
    likesQuery.likesControllerGetFindUserLike({
      data: {
        id: findId,
      },
    })
  );

  const handleLike = async () => {
    if (!session) {
      return router.push("/(modals)/login");
    }

    try {
      await likesApi.likesControllerUpdateLike({
        data: {
          id: findId,
        },
      });

      refetchLike();
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (error?.message) {
      Toast.show(
        error
          ? error.message && error?.message.includes("409")
            ? "Too many requests..."
            : error?.message
          : "Something went wrong with Likes",
        {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: false,
          animation: true,
          hideOnPress: true,
          backgroundColor: "#FFF",
          textStyle: Theme.BodyText,
          delay: 0,
        }
      );
    }
  }, [error?.message]);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 20,
      }}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity onPress={() => handleLike()}>
          <MaterialCommunityIcons
            name="hand-clap"
            size={25}
            color={
              like?.id
                ? like.deleted_at
                  ? Colors.grey
                  : Colors.primary
                : Colors.grey
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LikeButton;
