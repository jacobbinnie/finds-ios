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

type FormInputs = {
  email: string;
  password: string;
  firstname?: string;
};

const Login = () => {
  const { session, setSession } = useAuth();

  const [screen, setScreen] = useState<"login" | "signup">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dimensions = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormInputs>({
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (screen === "login") {
        const res: any = await authApi.authControllerLogin({
          data: {
            username: data.email,
            password: data.password,
          },
        });

        if (
          res.data.access_token !== null &&
          res.data.refresh_token !== null &&
          res.data.user.id
        ) {
          const session = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            profile: {
              id: res.data.user.id,
              firstname: res.data.user.firstname,
              created_at: res.data.user.created_at,
              email: res.data.user.email,
              avatar: res.data.user.avatar,
              username: res.data.user.username,
            },
          };

          storage.set("auth", JSON.stringify(session));

          setSession(session);
          setIsSubmitting(false);
        }
      } else {
        if (data.firstname) {
          const res: any = await authApi.authControllerRegisterUser({
            email: data.email,
            firstname: data.firstname,
            password: data.password,
          });

          if (
            res.data.access_token !== null &&
            res.data.refresh_token !== null &&
            res.data.user.id
          ) {
            const session = {
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              profile: {
                id: res.data.user.id,
                firstname: res.data.user.firstname,
                created_at: res.data.user.created_at,
                email: res.data.user.email,
                avatar: res.data.user.avatar,
                username: res.data.user.username,
              },
            };

            storage.set("auth", JSON.stringify(session));

            setSession(session);
            setIsSubmitting(false);
          }
          setIsSubmitting(false);
        }
      }
    } catch (err: any) {
      if (err.response.data.statusCode === 409) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }

      setIsSubmitting(false);
    }
  };

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

          {screen === "signup" && (
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
          )}

          <TouchableOpacity
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
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;
