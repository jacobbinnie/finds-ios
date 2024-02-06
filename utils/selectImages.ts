import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export const selectAndUploadImages = async (useLibrary: boolean) => {
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
    const savedImages = await Promise.all(
      result.assets.map(async (asset) => {
        const savedImage = await saveImage(asset.uri, asset?.exif?.Orientation);
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
  }
};
