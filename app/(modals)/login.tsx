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

  const [isSigningIn, setIsSigningIn] = useState(false);
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
                setIsSigningIn(true);
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
                  setIsSigningIn(false);
                }
                // signed in
              } catch (e) {
                setIsSigningIn(false);
                // if (e.code === "ERR_REQUEST_CANCELED") {
                //   // handle that the user canceled the sign-in flow
                // } else {
                //   // handle other errors
                // }
              }
            }}
          />

          {/* {screen === "signup" && (
            <Controller
              control={control}
              rules={{
                required: "First name is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="First name"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize={"none"}
                  style={[
                    Theme.InputStyle,
                    errors.firstname
                      ? { borderColor: "red", borderWidth: 1 }
                      : null,
                  ]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="firstname"
            />
          )}
          {errors.firstname && (
            <Text style={[Theme.Caption, { color: "red" }]}>
              {errors.firstname.message}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoFocus
                placeholder="Email"
                placeholderTextColor={Colors.grey}
                autoCapitalize={"none"}
                style={[
                  Theme.InputStyle,
                  errors.email ? { borderColor: "red", borderWidth: 1 } : null,
                ]}
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                }}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={[Theme.Caption, { color: "red" }]}>
              {errors.email.message}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 7,
                message: "Password must be at least 7 characters",
              },
              validate: (value) => {
                // Custom validation for at least one number
                if (!/\d/.test(value)) {
                  return "Password must contain at least one number";
                }
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                placeholderTextColor={Colors.grey}
                autoCapitalize={"none"}
                style={[
                  Theme.InputStyle,
                  errors.password
                    ? { borderColor: "red", borderWidth: 1 }
                    : null,
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={[Theme.Caption, { color: "red" }]}>
              {errors.password.message}
            </Text>
          )} */}

          {/* <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              width: "100%",
              backgroundColor: Colors.primary,
              height: 50,
              borderRadius: 10,
              marginTop: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isSubmitting ? (
              <ActivityIndicator color={Colors.light} />
            ) : (
              <Text
                style={{
                  fontFamily: "font-b",
                  fontSize: 16,
                  color: Colors.light,
                  textAlign: "center",
                  lineHeight: 50,
                }}
              >
                {screen === "login" ? "Sign in" : "Create account"}
              </Text>
            )}
          </TouchableOpacity>

          {error && (
            <Text
              style={[
                Theme.Caption,
                { color: "red", marginTop: 15, textAlign: "center" },
              ]}
            >
              {error}
            </Text>
          )}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <Text style={[Theme.Caption]}>
              {screen === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setScreen((prev) => (prev === "login" ? "signup" : "login"));
                clearErrors();
              }}
            >
              <Text
                style={[
                  Theme.Caption,
                  { fontSize: 14, fontFamily: "font-b", color: Colors.primary },
                ]}
              >
                {screen === "login" ? "Sign up" : "Sign in"}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;
