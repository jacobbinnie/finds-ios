import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { GooglePlace } from "@/types/types";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  review: string;
  rating: string;
};

const CreateFind = () => {
  const { id, data } = useLocalSearchParams<{ id: string; data: string }>();

  const router = useRouter();
  const place = JSON.parse(data) as GooglePlace;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      review: "",
      rating: "",
    },
  });
  const onSubmit = handleSubmit((data: FormData) => console.log(data));

  return (
    <View
      style={[
        Theme.Container,
        {
          paddingVertical: 15,
          gap: 15,
        },
      ]}
    >
      <View style={{ gap: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: 10,
            maxWidth: "75%",
          }}
        >
          <FontAwesome name="map-marker" size={15} color={Colors.primary} />
          <Text numberOfLines={1} style={Theme.BodyText}>
            {place.shortFormattedAddress}
          </Text>
        </View>
        <Text style={Theme.Title}>{place.displayName.text}</Text>
      </View>

      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Review"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="review"
        />
        {errors.review && <Text>Please write a review</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            min: 1,
            max: 10,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType="numeric"
              placeholder="Rating"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="rating"
        />
        {errors.rating && <Text>Please rate your find</Text>}
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            borderColor: Colors.grey,
            borderWidth: 1,
            paddingHorizontal: 15,
            paddingVertical: 15,
            gap: 5,
            borderRadius: 99,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={[Theme.BodyText, { color: Colors.grey }]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit as any)}
          style={{
            backgroundColor: Colors.primary,
            width: "50%",
            paddingVertical: 15,
            gap: 5,
            borderRadius: 99,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[Theme.BodyText, { color: Colors.light }]}>Publish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateFind;
