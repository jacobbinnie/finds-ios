import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Theme } from "@/constants/Styles";
import Search from "./search";
import { StatusBar } from "expo-status-bar";
import { Marquee } from "@animatereactnative/marquee";
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";

const NewFindTab = () => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#FFF" }} />
      <StatusBar style="dark" />
      <View
        style={[
          Theme.Container,
          {
            paddingTop: 15,
            paddingHorizontal: 0,
            backgroundColor: "#FFF",
          },
        ]}
      >
        <Animated.View entering={FadeInUp.springify().delay(600)}>
          <Marquee speed={0.5} spacing={10}>
            <Text style={[Theme.BigTitle, { letterSpacing: 30 }]}>
              🍔🍟🍕🌭🥪🌮🌯🥙🥚🥓🥩🍖🍗🍤🍣🍱🍛🍝🍜🍲🍥🍙🍚🍘🍢🍡🥟🥠🥮🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯☕🍵🍾🍷🍸🍹🍺🍻🥂🥃🥤🧃🧉
            </Text>
          </Marquee>
        </Animated.View>

        <View style={{ paddingHorizontal: 15, gap: 5, paddingTop: 15 }}>
          <Animated.Text
            entering={FadeInLeft.springify().delay(100)}
            style={Theme.BigTitle}
          >
            Find something?
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.springify().delay(300)}
            style={Theme.BodyText}
          >
            Let's goooooo! Search the place below and let's share your find with
            the world
          </Animated.Text>
        </View>
        <Search />
      </View>
    </>
  );
};

export default NewFindTab;
