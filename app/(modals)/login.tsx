import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "expo-router";
import { Theme } from "@/constants/Styles";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";
import { set } from "date-fns";
import axios from "axios";
import { authApi } from "@/types";
import { storage } from "@/utils/storage";

type FormInputs = {
  email: string;
  password: string;
  firstname?: string;
};

const Login = () => {
  const { session, setSession } = useAuth();
  const router = useRouter();

  const [screen, setScreen] = useState<"login" | "signup">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

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
              image: res.data.user.avatar,
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
                image: res.data.user.avatar,
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
    <View
      style={[
        Theme.Container,
        {
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#FFF",
        },
      ]}
    >
      <Text style={[Theme.BigTitle, { marginBottom: 15 }]}>finds.nyc</Text>

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
            placeholder="Email"
            style={[
              Theme.InputStyle,
              errors.email ? { borderColor: "red", borderWidth: 1 } : null,
            ]}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text.toLowerCase());
              clearErrors("email");
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
            style={[
              Theme.InputStyle,
              errors.password ? { borderColor: "red", borderWidth: 1 } : null,
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

      {screen === "signup" && (
        <Controller
          control={control}
          rules={{
            required: "First name is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="First name"
              style={[
                Theme.InputStyle,
                errors.firstname
                  ? { borderColor: "red", borderWidth: 1 }
                  : null,
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
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
            {screen === "login" ? "Log in" : "Create account"}
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
            {screen === "login" ? "Sign up" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
