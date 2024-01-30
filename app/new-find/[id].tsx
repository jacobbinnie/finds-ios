import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Button,
  ScrollView,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
// import { useForm, Controller } from "react-hook-form";
import { Marquee } from "@animatereactnative/marquee";
import { useAuth } from "@/providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";
import { decode, encode } from "base64-arraybuffer";
import { useForm } from "react-hook-form";

type FormData = {
  review: string;
  rating: string;
  place: {
    name: string;
    google_place_id: string;
    short_formatted_address: string;
    google_maps_uri: string;
    types: string[];
  };
};

type Images = {
  uri: string;
  base64: string | null | undefined;
  publicUrl?: string;
};

const NewFind = () => {
  const { id, data } = useLocalSearchParams<{ id: string; data: string }>();

  return (
    <View>
      <Text>New Find</Text>
    </View>
  );
};

export default NewFind;
