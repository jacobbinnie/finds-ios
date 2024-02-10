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
import { useRouter } from "expo-router";
import { Theme } from "@/constants/Styles";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";
import { set } from "date-fns";
import axios from "axios";
import { authApi, usersApi } from "@/types";
import { storage } from "@/utils/storage";
import { AuthUserDto } from "@/types/generated";
import { SafeAreaView } from "react-native-safe-area-context";

type FormInputs = {
  username: string;
};

const OnboardingUsername = () => {
  const { session, setSession } = useAuth();

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
      username: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await usersApi.usersControllerUpdateUsername(data.username);

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
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: "flex-start",
      }}
      behavior={"position"}
      keyboardVerticalOffset={-150}
    >
      <View
        style={[
          Theme.Container,
          {
            justifyContent: "center",
            gap: 10,
            backgroundColor: "#FFF",
            width: dimensions.width,
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            marginBottom: 15,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.dark,
              padding: 10,
              borderRadius: 99,
            }}
          >
            <Text style={[Theme.Caption, { color: Colors.light }]}>
              Step 1 of 2
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 15,
            marginBottom: 15,
          }}
        >
          <Text style={Theme.BigTitle}>Choose your username</Text>
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
              placeholder={"username"}
              placeholderTextColor={Colors.grey}
              autoCapitalize={"none"}
              style={[
                Theme.InputStyle,
                errors.username ? { borderColor: "red", borderWidth: 1 } : null,
              ]}
              onBlur={onBlur}
              onChangeText={(text) => {
                onChange(text.toLowerCase());
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
    </KeyboardAvoidingView>
  );
};

export default OnboardingUsername;
