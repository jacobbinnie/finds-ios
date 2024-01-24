import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "expo-router";
import { Theme } from "@/constants/Styles";
import { useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";

type FormInputs = {
  email: string;
  password: string;
  firstname?: string;
};

const Login = () => {
  const { profile } = useAuth();
  const router = useRouter();

  const [screen, setScreen] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (profile) {
      router.back();
    }
  }, [profile]);

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

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("Form Data:", data);
    // You can perform any further actions, such as API calls or navigation here
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
      <Text
        style={[
          Theme.Title,
          { fontSize: 32, color: Colors.primary, marginBottom: 15 },
        ]}
      >
        finds
      </Text>

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
            value: 8,
            message: "Password must be at least 8 characters",
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
        }}
      >
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
      </TouchableOpacity>

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
