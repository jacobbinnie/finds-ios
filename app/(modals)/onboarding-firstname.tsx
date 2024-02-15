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
import Animated, { FadeInLeft } from "react-native-reanimated";

type FormInputs = {
  firstname: string;
};

const OnboardingFirstname = () => {
  const { session, setSession } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dimensions = useWindowDimensions();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormInputs>({
    defaultValues: {
      firstname: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await usersApi.usersControllerUpdateFirstname(data.firstname);

      if (session?.profile && res.data.firstname) {
        setSession({
          ...session,
          profile: {
            ...session?.profile,
            firstname: res.data.firstname,
          },
        });
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
          <Animated.Text
            entering={FadeInLeft.springify().delay(200)}
            style={Theme.BodyText}
          >
            Step 2 of 2
          </Animated.Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 15,
            marginBottom: 15,
          }}
        >
          <Text style={Theme.BigTitle}>What's your first name?</Text>
        </View>

        <Controller
          control={control}
          rules={{
            required: "First name is required",
            pattern: {
              value: /^[a-z ,.'-]+$/i,
              message: "Invalid first name. It should only include letters.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoComplete="off"
              autoCorrect={false}
              spellCheck={false}
              placeholder={"eg. Jessica"}
              placeholderTextColor={Colors.grey}
              style={[
                Theme.InputStyle,
                errors.firstname
                  ? { borderColor: "red", borderWidth: 1 }
                  : null,
              ]}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text.replace(/\s/g, ""))}
              value={value}
            />
          )}
          name="firstname"
        />
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
              {"Let's get started"}
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

export default OnboardingFirstname;
