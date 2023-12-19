import { SafeAreaView, View } from "react-native";
import React from "react";
import { Theme } from "@/constants/Styles";
import { Stack } from "expo-router";
import Search from "@/components/Search/Search";
import Colors from "@/constants/Colors";

const Page = () => {
  return (
    <View style={Theme.Container}>
      <SafeAreaView />
      <Search />
    </View>
  );
};

export default Page;
