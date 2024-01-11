import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { GooglePlace } from "@/types/types";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Slider } from "react-native-elements";
import { types } from "@babel/core";

type FormData = {
  review: string;
  rating: string;
  vibe: string;
  place: {
    name: string;
    google_place_id: string;
    short_formatted_address: string;
    google_maps_uri: string;
    types: string[];
  };
};

const CreateFind = () => {
  const { id, data } = useLocalSearchParams<{ id: string; data: string }>();

  const router = useRouter();
  const place = JSON.parse(data) as GooglePlace;

  const [rating, setRating] = useState("");

  const handleSelectRating = (value: number) => {
    setRating(value.toString());
  };

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      review: "",
      rating: "",
      vibe: "",
      place: {
        name: place.displayName.text,
        google_place_id: place.id,
        short_formatted_address: place.shortFormattedAddress,
        google_maps_uri: place.googleMapsUri,
        types: place.types,
      },
    },
  });
  const onSubmit = handleSubmit((data: FormData) => console.log(data));

  const currentRating = watch("rating");
  const currentVibe = watch("vibe");

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
      <Text
        style={[
          Theme.Title,
          {
            fontSize: 32,
          },
        ]}
      >
        New find
      </Text>

      <View style={{ gap: 10, marginTop: 15 }}>
        <Text style={Theme.Title}>{place.displayName.text}</Text>
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
      </View>

      <View style={{ gap: 10 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                Theme.BodyText,
                {
                  borderWidth: 1,
                  borderColor: errors.review ? "red" : Colors.grey,
                  borderRadius: 10,
                  padding: 15,
                },
              ]}
              placeholder="Write a review"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="review"
        />
      </View>

      <View style={{ gap: 10 }}>
        <Text style={Theme.BodyText}>Overall rating</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            min: 1,
            max: 10,
          }}
          render={({ field: { onChange, onBlur } }) => (
            <ScrollView
              style={{
                gap: 10,
                display: "flex",
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Array.from({ length: 19 }, (_, index) => 10 - index * 0.5).map(
                (number) => (
                  <TouchableOpacity
                    onBlur={onBlur}
                    style={{
                      width: 70,
                      borderWidth: Number(currentRating) === number ? 0 : 1,
                      backgroundColor:
                        Number(currentRating) === number
                          ? Colors.dark
                          : Colors.light,
                      borderColor: Colors.grey,
                      padding: 15,
                      marginRight: 5,
                      borderRadius: 10,
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                    key={number}
                    onPress={() => onChange(number)}
                  >
                    <Text
                      style={[
                        Theme.BodyText,
                        {
                          color:
                            Number(currentRating) === number
                              ? Colors.light
                              : Colors.dark,
                        },
                      ]}
                    >
                      {number}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>
          )}
          name="rating"
        />
        {errors.rating && (
          <Text
            style={[
              Theme.BodyText,
              {
                color: "red",
              },
            ]}
          >
            Please rate your find
          </Text>
        )}
      </View>

      <View style={{ gap: 10 }}>
        <Text style={Theme.BodyText}>Vibe</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            min: 1,
            max: 10,
          }}
          render={({ field: { onChange, onBlur } }) => (
            <ScrollView
              style={{
                gap: 10,
                display: "flex",
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Array.from({ length: 19 }, (_, index) => 10 - index * 0.5).map(
                (number) => (
                  <TouchableOpacity
                    onBlur={onBlur}
                    style={{
                      width: 70,
                      borderWidth: Number(currentVibe) === number ? 0 : 1,
                      backgroundColor:
                        Number(currentVibe) === number
                          ? Colors.dark
                          : Colors.light,
                      borderColor: Colors.grey,
                      padding: 15,
                      marginRight: 5,
                      borderRadius: 10,
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                    key={number}
                    onPress={() => onChange(number)}
                  >
                    <Text
                      style={[
                        Theme.BodyText,
                        {
                          color:
                            Number(currentVibe) === number
                              ? Colors.light
                              : Colors.dark,
                        },
                      ]}
                    >
                      {number}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>
          )}
          name="vibe"
        />
        {errors.vibe && (
          <Text
            style={[
              Theme.BodyText,
              {
                color: "red",
              },
            ]}
          >
            Please rate the vibe
          </Text>
        )}
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          position: "absolute",
          bottom: 30,
          left: 15,
          width: "100%",
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
