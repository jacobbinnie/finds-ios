import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Theme } from "@/constants/Styles";
import { useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";
import { authApi } from "@/types";
import { storage } from "@/utils/storage";
import { Marquee } from "@animatereactnative/marquee";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as AppleAuthentication from "expo-apple-authentication";
import axios from "axios";
import { set } from "date-fns";

type FormInputs = {
  email: string;
  password: string;
  firstname?: string;
};

const Login = () => {
  const { session, setSession } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const dimensions = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: "flex-start",
      }}
      behavior={"position"}
      keyboardVerticalOffset={-150}
    >
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{
          width: dimensions.width,
          minHeight: dimensions.height,
          backgroundColor: "#FFF",
        }}
      >
        <StatusBar style="dark" />
        <View
          style={[
            Theme.Container,
            {
              gap: 10,
              backgroundColor: "#FFF",
              justifyContent: "center",
              height: "100%",
            },
          ]}
        >
          <Text
            style={[
              Theme.Logo,
              {
                textAlign: "center",
                marginBottom: 15,
              },
            ]}
          >
            finds
          </Text>

          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={5}
            style={{ width: "100%", height: 50 }}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });

                if (credential.identityToken) {
                  const res =
                    await authApi.authControllerRegisterOrLoginWithApple({
                      data: {
                        jwt: credential.identityToken,
                      },
                    });

                  const authSession = {
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    profile: {
                      id: res.data.user.id,
                      firstname: res.data.user.firstname,
                      email: res.data.user.email,
                      avatar: res.data.user.avatar,
                      username: res.data.user.username,
                    },
                  };

                  storage.set("auth", JSON.stringify(authSession));
                  setSession(authSession);
                } else {
                  console.log("No identity token");
                }
                // signed in
              } catch (e) {
                console.log(e);
              }
            }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;
