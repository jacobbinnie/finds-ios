import { View, Text } from "react-native";
import React from "react";
import { Theme } from "@/constants/Styles";
import { useSupabase } from "@/providers/SupabaseProvider";

const Post = () => {
  const { profile } = useSupabase();

  if (!profile) {
    return null;
  }
  return (
    <View style={Theme.Container}>
      <Text>Post</Text>
    </View>
  );
};

export default Post;
