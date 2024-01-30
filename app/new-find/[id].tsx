import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PlaceDto, RatingDto, TagDto } from "@/types/generated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "@/constants/Styles";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { findsQuery } from "@/types/queries";
import { Ionicons } from "@expo/vector-icons";

type FormInputs = {
  review: string;
  ratingId: number;
  tags: {
    id: number;
  }[];
  googlePlaceId: string;
  images: string[];
};

const NewFind = () => {
  const { id, data } = useLocalSearchParams<{ id: string; data: string }>();

  const place = JSON.parse(data) as PlaceDto;

  const router = useRouter();
  const { session } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState<1 | 2>(1);

  const {
    data: tagsAndRatings,
    isLoading,
    error: findsAndRatingsError,
  } = useQuery(findsQuery.findsControllerGetAllRatingsAndTags());

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (findsAndRatingsError) {
  //   return <Text>{findsAndRatingsError.message}</Text>;
  // }

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      review: "",
      ratingId: 0,
      tags: [],
      googlePlaceId: place.googlePlaceId,
      images: [],
    },
  });

  const selectedRating = watch("ratingId");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // do submission here
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
    <ScrollView style={{ backgroundColor: "#FFF", paddingHorizontal: 15 }}>
      <SafeAreaView />
      <Text
        style={[
          Theme.BigTitle,
          {
            marginBottom: 15,
          },
        ]}
      >
        Add find
      </Text>
      <View
        style={{
          flex: 1,
          display: "flex",
          gap: 15,
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: 150,
            borderRadius: 10,
            backgroundColor: Colors.light,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons name="image-outline" size={24} color={Colors.dark} />
          <Text style={[Theme.BodyText, { color: Colors.dark }]}>
            Add photos
          </Text>
        </TouchableOpacity>

        <Text style={[Theme.Title, { marginTop: 5 }]}>Review</Text>
        <Controller
          control={control}
          rules={{
            required: "Review is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={
                "Sooooo how was it? Describe what made this find worth sharing.."
              }
              multiline
              style={[
                Theme.InputStyle,
                {
                  minHeight: 100,
                  paddingTop: 10,
                  lineHeight: 20,
                  backgroundColor: "#FFF",
                  borderWidth: 1,
                },
                errors.review
                  ? { borderColor: "red" }
                  : { borderColor: Colors.grey },
              ]}
              onBlur={onBlur}
              onChangeText={(text) => {
                onChange(text);
                clearErrors("review");
              }}
              value={value}
            />
          )}
          name="review"
        />
        {errors.review && (
          <Text style={[Theme.Caption, { color: "red" }]}>
            {errors.review.message}
          </Text>
        )}

        <Text style={[Theme.Title, { marginTop: 5 }]}>Rating</Text>
        {tagsAndRatings && (
          <Controller
            control={control}
            name="ratingId"
            rules={{
              required: "Rating is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  display: "flex",
                  gap: 10,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {tagsAndRatings.ratings.map((rating, key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => onChange(rating.id)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        selectedRating === rating.id
                          ? Colors.dark
                          : Colors.light,
                      borderRadius: 99,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={[
                        Theme.Caption,
                        {
                          color:
                            selectedRating === rating.id
                              ? Colors.light
                              : Colors.dark,
                        },
                      ]}
                      key={rating.id}
                    >
                      {rating.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
        )}
        {errors.ratingId && (
          <Text style={[Theme.Caption, { color: "red" }]}>
            {errors.ratingId.message}
          </Text>
        )}

        <Text style={[Theme.Title, { marginTop: 5 }]}>Tags</Text>
        <Controller
          control={control}
          name="tags"
          rules={{
            required: "At least 1 tag is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                display: "flex",
                gap: 15,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                placeholder={"pizza, filter coffee, cocktails"}
                style={[
                  Theme.InputStyle,
                  {
                    backgroundColor: "#FFF",
                    borderWidth: 1,
                    textTransform: "lowercase",
                  },
                  errors.review
                    ? { borderColor: "red" }
                    : { borderColor: Colors.grey },
                ]}
                onBlur={onBlur}
              />
            </View>
          )}
        />

        {errors.tags && (
          <Text style={[Theme.Caption, { color: "red" }]}>
            {errors.tags.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[
            Theme.Button,
            { backgroundColor: Colors.dark, marginTop: 15 },
          ]}
        >
          <Text style={[Theme.ButtonText, { color: Colors.light }]}>
            Submit find
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewFind;
