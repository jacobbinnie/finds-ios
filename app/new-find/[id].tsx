import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PlaceDto, CreateFindDto } from "@/types/generated";
import { Theme } from "@/constants/Styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { findsQuery, placesQuery, searchQuery } from "@/types/queries";
import { Ionicons } from "@expo/vector-icons";
import { FadeInLeft, FadeInRight, FadeOutRight } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements/dist/buttons/Button";
import { findsApi } from "@/types";
import { jwtDecode } from "jwt-decode";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native-elements";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { set } from "date-fns";
import { StatusBar } from "expo-status-bar";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const NewFind = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();
  const { session, setSession, signout } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const { data: place } = useQuery(
    searchQuery.searchControllerGetGooglePlaceById(id!)
  );

  const {
    data: categories,
    isLoading,
    error: categoriesError,
  } = useQuery(findsQuery.findsControllerGetAllCategories());

  const [images, setImages] = useState<
    { localImage: string; serverImage?: string }[]
  >([]);

  const uploadImage = async (uri: string) => {
    // setImageUploading(true);

    const res = await FileSystem.uploadAsync(
      process.env.EXPO_PUBLIC_API_URL + "/upload",
      uri,
      {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "files",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.body;
  };

  const saveImage = async (uri: string, orientation: number) => {
    await ensureDirExists();

    const filename = new Date().getTime() + ".jpg";
    const dest = imgDir + filename;

    // Use the ImageManipulator from expo to correct the orientation
    const processedImage = await manipulateAsync(uri, [], {
      format: SaveFormat.JPEG,
      compress: 1,
      base64: false,
    });

    await FileSystem.copyAsync({ from: processedImage.uri, to: dest });
    return dest;
  };

  const selectImages = async (useLibrary: boolean) => {
    let result;

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      });
    } else {
      await ImagePicker.requestCameraPermissionsAsync();

      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (!result.canceled) {
      setIsUploading(true);
      const savedImages = await Promise.all(
        result.assets.map(async (asset) => {
          const savedImage = await saveImage(
            asset.uri,
            asset?.exif?.Orientation
          );
          return savedImage;
        })
      );

      setImages((prevImages) => [
        ...prevImages,
        ...savedImages.map((image) => ({ localImage: image })),
      ]);

      const uploadedImages = await Promise.all(
        savedImages.map(async (savedImage) => {
          return await uploadImage(savedImage);
        })
      );

      const image_urls: string[] = [];

      for (const item of uploadedImages) {
        const json_array: string[] = JSON.parse(item);
        const image_url: string = json_array[0];
        image_urls.push(image_url);
      }

      const updatedImages = savedImages.map((savedImage, index) => ({
        localImage: savedImage,
        serverImage: image_urls[index],
      }));

      setImages((prevImages) => [
        ...prevImages.filter((image) => image.serverImage != null),
        ...updatedImages,
      ]);
      setIsUploading(false);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    setValue,
  } = useForm<CreateFindDto>({
    defaultValues: {
      review: undefined,
      categoryId: undefined,
      tags: [],
      googlePlaceId: id,
      images: [],
    },
  });

  const selectedCategory = watch("categoryId");
  const currentTags = watch("tags");

  useEffect(() => {
    setValue(
      "images",
      images.map((image) => image.serverImage || "") // Use empty string if serverImage is undefined
    );
  }, [images]);

  const dimensions = useWindowDimensions();

  const onSubmit: SubmitHandler<CreateFindDto> = async (values) => {
    setIsSubmitting(true);
    setError(null);

    if (!session?.accessToken) {
      signout();
    } else {
      const decodedRefreshToken = jwtDecode(session.refreshToken);

      if (
        decodedRefreshToken.exp &&
        decodedRefreshToken.exp * 1000 < Date.now()
      ) {
        router.push("/(modals)/login");
      }

      try {
        const res = await findsApi.findsControllerCreateFind(values);
        if (res.data) {
          router.back();
        } else {
          setError("Something went wrong");
          setIsSubmitting(false);
        }
      } catch (err: any) {
        if (err.response.data.statusCode === 412) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong");
        }

        setIsSubmitting(false);
      }
    }
  };

  const [inputTags, setInputTags] = useState("");

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.dark} />;
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: "flex-start",
      }}
      behavior={"position"}
    >
      <SafeAreaView
        style={{ backgroundColor: "#FFF" }}
        edges={["top", "left", "right"]}
      >
        <StatusBar style="dark" />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
            marginTop: 15,
            marginBottom: 5,
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
            {place?.displayName.text}
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
          <Controller
            name="images"
            control={control}
            rules={{
              required: "At least 1 image is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ScrollView
                style={{ height: 250 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  onPress={() => selectImages(true)}
                  style={{
                    width:
                      images && images?.length > 0
                        ? 150
                        : dimensions.width - 30,
                    height: "100%",
                    backgroundColor: Colors.light,
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <Ionicons
                    name="images-outline"
                    size={24}
                    color={Colors.grey}
                  />
                </TouchableOpacity>

                {images &&
                  images.map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        marginRight: 10,
                        position: "relative",
                        alignItems: "center", // Center horizontally
                        justifyContent: "center", // Center vertically
                      }}
                    >
                      <Image
                        source={{ uri: image.localImage }}
                        style={{
                          width: 150,
                          flex: 1,
                          borderRadius: 10,
                        }}
                      />
                      {!image.serverImage && (
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
            )}
          />
          {errors.images && (
            <Text style={[Theme.Caption, { color: "red" }]}>
              {errors.images.message}
            </Text>
          )}

          <Text style={[Theme.Title, { marginTop: 5 }]}>Category</Text>
          {categories && (
            <Controller
              control={control}
              name="categoryId"
              rules={{
                required: "Category is required",
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
                          selectedCategory === category.id
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
                              selectedCategory === category.id
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
          {errors.categoryId && (
            <Text style={[Theme.Caption, { color: "red" }]}>
              {errors.categoryId.message}
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
                  const formattedText = text.replace(/\\n/g, "\n");
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
                        onChange([...value, newTag.toLowerCase()]);
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

          <View style={{ paddingTop: 15, gap: 15 }}>
            {error && (
              <Text style={[Theme.Caption, { color: "red" }]}>{error}</Text>
            )}

            <Button
              disabled={isSubmitting || isUploading}
              titleStyle={[Theme.Title, { color: Colors.light }]}
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting || isUploading}
              loadingProps={{
                children: (
                  <ActivityIndicator size="small" color={Colors.light} />
                ),
              }}
              title={"Submit find"}
              style={[
                Theme.Button,
                {
                  backgroundColor: Colors.dark,
                  marginBottom: 100,
                },
              ]}
            ></Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewFind;
