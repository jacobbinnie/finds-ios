import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { savesQuery } from "@/types/queries";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { savesApi } from "@/types";
import Toast from "react-native-root-toast";
import { Theme } from "@/constants/Styles";

const SaveButton = ({ findId }: { findId: number }) => {
  const { session } = useAuth();
  const router = useRouter();

  const {
    data: save,
    refetch: refetchSave,
    error,
    isLoading,
  } = useQuery(
    savesQuery.savesControllerGetFindUserSave({
      data: {
        id: findId,
      },
    })
  );

  const handleSave = async () => {
    if (!session) {
      return router.push("/(modals)/login");
    }

    try {
      await savesApi.savesControllerUpdateSave({
        data: {
          id: findId,
        },
      });

      refetchSave();
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    Toast.show(
      error
        ? error.message && error?.message.includes("409")
          ? "Too many requests..."
          : error?.message
        : "",
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
        <TouchableOpacity onPress={() => handleSave()}>
          <Ionicons
            name="ios-heart"
            size={30}
            color={
              save?.id
                ? save.deleted_at
                  ? Colors.light
                  : Colors.primary
                : Colors.light
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SaveButton;
