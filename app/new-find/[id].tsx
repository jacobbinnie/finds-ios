import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Button,
  ScrollView,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Styles";
import { Place } from "@/types/types";
import { useForm, Controller } from "react-hook-form";
import { Marquee } from "@animatereactnative/marquee";
import { supabase } from "@/utils/supabase";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useQueryClient } from "@tanstack/react-query";
import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";
import { decode, encode } from "base64-arraybuffer";

type FormData = {
  review: string;
  rating: string;
  place: {
    name: string;
    google_place_id: string;
    short_formatted_address: string;
    google_maps_uri: string;
    types: string[];
  };
};

type Images = {
  uri: string;
  base64: string | null | undefined;
  publicUrl?: string;
};

const NewFind = () => {
  const { id, data } = useLocalSearchParams<{ id: string; data: string }>();

  const [images, setImages] = useState<Images[]>([]);

  const dimensions = useWindowDimensions();

  const router = useRouter();
  const place = JSON.parse(data) as Place;
  const { profile } = useSupabase();

  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const generateMD5Hash = async (inputString: string) => {
    try {
      // Generate MD5 hash
      const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.MD5,
        inputString
      );

      return digest;
    } catch (error) {
      console.error("Error generating MD5 hash:", error);
    }
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
      place: {
        name: place.name,
        google_place_id: place.id,
        short_formatted_address: place.short_formatted_address,
        google_maps_uri: place.google_maps_uri,
        types: place.categories,
      },
    },
  });

  const finaliseFindSubmission = async (
    placeId: string,
    data: FormData,
    profileId: string
  ) => {
    const uploadedImages: string[] = [];

    images.map(
      (image) => image.publicUrl && uploadedImages.push(image.publicUrl)
    );

    const { data: newFind, error: newFindError } = await supabase
      .from("finds")
      .insert({
        review: data.review,
        rating: data.rating,
        photos: uploadedImages,
        place: placeId,
        user_id: profileId,
      })
      .select();

    if (newFindError) {
      setError(newFindError.message);
    }

    console.log("Added new find");

    await queryClient.refetchQueries({
      queryKey: ["finds", "place", place.google_places_id],
    });

    router.back();

    console.log("Refetched queries");
  };

  const onSubmit = handleSubmit(async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Submitting");

    if (!profile) {
      router.push("/login");
      setIsSubmitting(false);
      return;
    }

    const hashedGooglePlaceId = await generateMD5Hash(place.google_places_id);

    if (!hashedGooglePlaceId) {
      setIsSubmitting(false);
      setError("Error hashing Google Place ID");
      return;
    }

    const { data: upsertPlace, error: upsertPlaceError } = await supabase
      .from("places")
      .upsert([
        {
          id: hashedGooglePlaceId,
          categories: place.categories,
          google_maps_uri: place.google_maps_uri,
          short_formatted_address: place.short_formatted_address,
          name: place.name,
          google_places_id: place.google_places_id,
          updated_at: new Date().toISOString(),
        },
      ])
      .select("*")
      .single();

    if (upsertPlaceError) {
      console.error(upsertPlaceError.message);
      setIsSubmitting(false);
      setError(upsertPlaceError.message);
      return;
    }

    console.log("Upserted place");

    await finaliseFindSubmission(upsertPlace.id, data, profile.id);
  });

  const currentRating = watch("rating");

  const handleGetPublicUrl = async (path: string) => {
    const { data } = supabase.storage.from("images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
      allowsMultipleSelection: true,
    });

    if (result !== null) {
      // Extract base64 data from each selected image
      if (!result.canceled) {
        // Extract base64 data from each selected image
        const selectedImages =
          result?.assets?.map((asset) => ({
            uri: asset.uri,
            base64: asset.base64,
          })) || [];

        // Update the images state with the local images
        setImages((prevImages) => [...(prevImages ?? []), ...selectedImages]);

        const updatedImages: Images[] = [];

        // Upload the images to Supabase
        try {
          await Promise.all(
            selectedImages.map(async (image) => {
              if (image.base64) {
                const { data, error } = await supabase.storage
                  .from("images")
                  .upload(
                    `${profile?.id}${Date.now()}/${
                      Date.now().toString() + Math.floor(Math.random() * 100)
                    }.jpg`,
                    decode(image.base64),
                    {
                      cacheControl: "3600",
                      upsert: false,
                      contentType: "image/jpeg",
                    }
                  );

                if (error) {
                  throw error;
                }

                const publicUrl = await handleGetPublicUrl(data.path);

                updatedImages.push({
                  uri: image.uri,
                  base64: image.base64,
                  publicUrl: publicUrl,
                });
              }
            })
          );

          setImages(updatedImages);

          // Update the images state with the uploaded images
        } catch (error) {
          console.error("Error uploading images to Supabase:", error);
        }
      }
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFF",
      }}
      contentContainerStyle={{
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Marquee
        spacing={20}
        speed={0.5}
        style={{ backgroundColor: Colors.primary, paddingVertical: 15 }}
      >
        <Text
          style={[
            Theme.Title,
            {
              color: Colors.light,
            },
          ]}
        >
          {place.name}
        </Text>
      </Marquee>
      <View
        style={[
          Theme.Container,
          {
            paddingVertical: 15,
            gap: 15,
            backgroundColor: "#FFF",
          },
        ]}
      >
        <Text style={[Theme.Title, { fontSize: 32, paddingVertical: 15 }]}>
          Share your find
        </Text>
        <View style={{ gap: 10 }}>
          <Text style={Theme.Title}>{place.name}</Text>
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
            <Text
              numberOfLines={1}
              style={[Theme.Caption, { color: Colors.grey }]}
            >
              {place.short_formatted_address}
            </Text>
          </View>
        </View>

        <View>
          <ScrollView
            style={{ height: 150 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              onPress={handlePickImage}
              style={{
                width:
                  images && images?.length > 0 ? 200 : dimensions.width - 30,
                height: "100%",
                backgroundColor: Colors.light,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Ionicons name="images-outline" size={24} color={Colors.grey} />
            </TouchableOpacity>

            {images &&
              images.map((image, index) => (
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    position: "relative",
                    alignItems: "center", // Center horizontally
                    justifyContent: "center", // Center vertically
                  }}
                >
                  <Image
                    source={{ uri: image.uri }}
                    style={{
                      width: 200,
                      flex: 1,
                      borderRadius: 10,
                      opacity: image.publicUrl ? 1 : 0.5,
                    }}
                  />
                  {!image.publicUrl && (
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.483)", // Adjust the background color and opacity as needed
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ActivityIndicator size="large" color="#FFF" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={[Theme.BodyText, { fontFamily: "font-b" }]}>Review</Text>
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
                    borderColor: errors.review ? "red" : Colors.light,
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
          <Text style={[Theme.BodyText, { fontFamily: "font-b" }]}>
            Overall rating
          </Text>
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
                        borderColor: Colors.light,
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
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          paddingVertical: 15,
          flex: 1,
          position: "absolute",
          bottom: 15,
          paddingHorizontal: 15,
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
          <Text style={[Theme.ButtonText, { color: Colors.grey }]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit as any)}
          style={{
            backgroundColor: Colors.primary,
            width: "50%",
            paddingVertical: 15,
            gap: 10,
            borderRadius: 99,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[Theme.ButtonText, { color: Colors.light }]}>
            Share find
          </Text>
          <Ionicons name="send" size={20} color={Colors.light} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewFind;
