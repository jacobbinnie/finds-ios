import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PlaceDto, CategoryDto } from "@/types/generated";
import { Theme } from "@/constants/Styles";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { findsQuery } from "@/types/queries";
import { Ionicons } from "@expo/vector-icons";
import { FadeInLeft, FadeInRight, FadeOutRight } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements/dist/buttons/Button";

type FormInputs = {
  review: string;
  ratingId: number;
  tags: string[];
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

  const {
    data: categories,
    isLoading,
    error: categoriesError,
  } = useQuery(findsQuery.findsControllerGetAllCategories());

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      review: undefined,
      ratingId: undefined,
      tags: [],
      googlePlaceId: place.googlePlaceId,
      images: [],
    },
  });

  const selectedRating = watch("ratingId");
  const currentTags = watch("tags");

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

  const [inputTags, setInputTags] = useState("");

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: "flex-start",
      }}
      behavior={"position"}
    >
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{ backgroundColor: "#FFF" }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Animated.View
              entering={FadeInLeft.springify().delay(800)}
              exiting={FadeOutRight}
              style={{
                borderRadius: 99,
                overflow: "hidden",
                bottom: 0,
                left: 0,
              }}
            >
              <Ionicons name="arrow-back" size={30} color="black" />
            </Animated.View>
          </TouchableOpacity>

          <Animated.Text
            entering={FadeInRight.springify().delay(300)}
            exiting={FadeOutRight}
            style={[Theme.Title]}
          >
            {place.name}
          </Animated.Text>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{
          backgroundColor: "#FFF",
          paddingHorizontal: 15,
          flex: 1,
          paddingTop: 15,
        }}
      >
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

          <Text style={[Theme.Title, { marginTop: 5 }]}>Category</Text>
          {categories && (
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
                  {categories.map((category, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => onChange(category.id)}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          selectedRating === category.id
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
                              selectedRating === category.id
                                ? Colors.light
                                : Colors.dark,
                          },
                        ]}
                        key={category.id}
                      >
                        {category.name}
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

          <Text style={[Theme.Title, { marginTop: 5 }]}>
            Tags (add at least 2)
          </Text>
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
                }}
              >
                <TextInput
                  placeholder={"pasta, filter coffee, cocktails..."}
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
                  autoCapitalize="none"
                  value={inputTags}
                  onChange={(e) => {
                    // only add tag if comma is entered
                    if (e.nativeEvent.text.endsWith(",")) {
                      const newTag = e.nativeEvent.text.replace(",", "").trim();
                      if (newTag.length > 0) {
                        onChange([...value, newTag]);
                        setInputTags(""); // Clear the TextInput
                      }
                    } else {
                      setInputTags(e.nativeEvent.text.toLowerCase()); // Update the TextInput value
                    }
                  }}
                  onSubmitEditing={() => {
                    // Add the current input as a new tag
                    const newTag = inputTags.trim();
                    if (newTag.length > 0) {
                      onChange([...value, newTag]);
                      setInputTags(""); // Clear the TextInput
                    }
                  }}
                />
                {currentTags.map((tag, key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      const newTags = currentTags.filter((t) => t !== tag);
                      onChange(newTags);
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: Colors.light,
                      borderRadius: 99,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={[
                        Theme.Caption,
                        {
                          color: Colors.dark,
                        },
                      ]}
                      key={tag}
                    >
                      {tag}
                    </Text>
                    <Ionicons name="close" size={16} color={Colors.dark} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />

          {errors.tags && (
            <Text style={[Theme.Caption, { color: "red" }]}>
              {errors.tags.message}
            </Text>
          )}

          <Button
            disabled={isSubmitting}
            titleStyle={[Theme.Title, { color: Colors.light }]}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            loadingProps={{
              children: <ActivityIndicator size="small" color={Colors.light} />,
            }}
            title={"Submit find"}
            style={[
              Theme.Button,
              {
                backgroundColor: Colors.dark,
                marginTop: 15,
                marginBottom: 100,
              },
            ]}
          ></Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewFind;
