import {
  SafeAreaView,
  View,
  Text,
  LayoutAnimation,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";
import { usersQuery } from "@/types/queries";
import { useRouter } from "expo-router";
import Find from "@/components/Find/Find";
import { Image } from "react-native-elements";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  FadeInDown,
} from "react-native-reanimated";
import { kFormatter } from "@/utils/kFormatter";
import Loader from "@/components/Loader/Loader";
import { FlashList } from "@shopify/flash-list";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { usersApi } from "@/types";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const MyProfile = () => {
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);

  const { session, signout } = useAuth();

  const router = useRouter();

  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    usersQuery.usersControllerGetProfileAndFinds(session?.profile.id!)
  );

  const [images, setImages] = useState<
    { localImage: string; serverImage?: string }[]
  >([]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  if (!profile) {
    return <Text>Profile not found</Text>;
  }

  const uploadImage = async (uri: string) => {
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
      });
    } else {
      await ImagePicker.requestCameraPermissionsAsync();

      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (!result.canceled) {
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

      await usersApi.usersControllerUpdateUserAvatar({
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data: {
          avatar: updatedImages[0].serverImage,
        },
      });

      setImages((prevImages) => [
        ...prevImages.filter((image) => image.serverImage != null),
        ...updatedImages,
      ]);
    }
  };

  return (
    <View style={{ flex: 1, gap: 15 }}>
      <SafeAreaView />

      <View style={{ paddingHorizontal: 15, gap: 15 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Animated.Text
            entering={FadeInLeft.springify()}
            exiting={FadeOutLeft}
            style={Theme.BigTitle}
          >
            @{profile.username}
          </Animated.Text>
          <Animated.View
            entering={FadeInRight.springify()}
            exiting={FadeOutRight}
          >
            <TouchableOpacity
              onPress={() => signout()}
              style={{
                borderColor: Colors.grey,
                borderWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 10,
                gap: 5,
                borderRadius: 99,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[Theme.ButtonText, { color: Colors.grey }]}>
                Sign out
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => selectImages(true)}
              style={{
                width: 70,
                height: 70,
                borderColor: Colors.grey,
                borderWidth: session?.profile.avatar ? 0 : 1,
              }}
            >
              <View
                style={{
                  width: 70,
                  height: 70,
                  position: "absolute",
                  zIndex: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather
                  name="edit"
                  size={20}
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                  color={Colors.dark}
                />
              </View>

              {images[0] ? (
                <>
                  <Image
                    source={{ uri: images[0].localImage }}
                    style={{ width: 70, height: 70, borderRadius: 99 }}
                  />
                  {!images[0].serverImage && (
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
                      <ActivityIndicator size="small" color={Colors.light} />
                    </View>
                  )}
                </>
              ) : (
                <Image
                  source={{ uri: session?.profile.avatar }}
                  style={{ width: 70, height: 70, borderRadius: 99 }}
                />
              )}
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                position: "relative",
                gap: 5,
              }}
            >
              <Text style={Theme.Title}>{session?.profile.firstname}</Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                  {kFormatter(profile.followers)} followers
                </Text>
                <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                  {kFormatter(profile.following)} following
                </Text>
              </View>
            </View>
          </View>
          {profile.bio && profile.bio.length > 1 && (
            <Text style={[Theme.BodyText, { color: Colors.grey }]}>
              {profile.bio}
            </Text>
          )}
        </View>

        {/* <Animated.View
          entering={FadeInDown.springify().delay(50)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 15,
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: Colors.grey,
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 10,
              gap: 5,
              flex: 1,
              borderRadius: 99,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[Theme.ButtonText, { color: Colors.grey }]}>
              Edit profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.dark,
              paddingHorizontal: 15,
              paddingVertical: 10,
              gap: 5,
              flex: 1,
              borderRadius: 99,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[Theme.ButtonText, { color: Colors.light }]}>
              Share profile
            </Text>
          </TouchableOpacity>
        </Animated.View> */}
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}
        onLayout={(e) => {
          if (findHeight) {
            e.nativeEvent.layout.height < findHeight &&
              setFindHeight(e.nativeEvent.layout.height);
          } else {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setFindHeight(e.nativeEvent.layout.height);
          }
        }}
      >
        {findHeight ? (
          <View
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              overflow: "hidden",
              flexGrow: 1,
            }}
          >
            <FlashList
              estimatedItemSize={findHeight - 40}
              ListFooterComponent={
                <View
                  style={{
                    height: 40,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={[Theme.BodyText, { color: Colors.grey }]}>
                    You're up to date!
                  </Text>
                </View>
              }
              decelerationRate={"fast"}
              viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
              pagingEnabled={true}
              onRefresh={() => refetch()}
              refreshing={isLoading}
              data={profile.finds}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={findHeight - 40}
              renderItem={({ item }) => (
                <Find isProfileFind findHeight={findHeight - 40} find={item} />
              )}
            />
          </View>
        ) : (
          <Loader />
        )}
      </View>
    </View>
  );
};

export default MyProfile;
