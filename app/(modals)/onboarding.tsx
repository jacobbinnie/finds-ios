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
import { authApi, usersApi } from "@/types";
import { storage } from "@/utils/storage";
import { AuthUserDto } from "@/types/generated";

type FormInputs = {
  username: string;
};

const Onboarding = () => {
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
      username: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res: any = await usersApi.usersControllerUpdateUsername(
        data.username
      );

      if (session && res.data) {
        const updatedSession = {
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          profile: res.data as AuthUserDto,
        };

        storage.set("auth", JSON.stringify(updatedSession));

        setSession(updatedSession);
        setIsSubmitting(false);
      } else {
        setError("Something went wrong");
        setIsSubmitting(false);
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
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
          marginBottom: 15,
        }}
      >
        <Text style={[Theme.Title, { fontSize: 36, color: Colors.primary }]}>
          Hey, {session?.profile.firstname} 👋
        </Text>

        <Text style={Theme.Subtitle}>add a username</Text>
      </View>

      <Controller
        control={control}
        rules={{
          required: "Username is required",
          pattern: {
            value: /^[A-Za-z0-9._%+-]{3,15}$/i,
            message:
              "Invalid username. It should only include letters, numbers, full stops, hyphens, and underscores.",
          },
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters long",
          },
          maxLength: {
            value: 15,
            message: "Username must be at most 15 characters long",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoComplete="off"
            textAlign="center"
            placeholder={"username"}
            style={[
              Theme.InputStyle,
              errors.username ? { borderColor: "red", borderWidth: 1 } : null,
            ]}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text.toLowerCase());
              setError(null);
              clearErrors("username");
            }}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username && (
        <Text style={[Theme.Caption, { color: "red" }]}>
          {errors.username.message}
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
            {"Check availability"}
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
    </View>
  );
};

export default Onboarding;
