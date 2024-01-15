import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

interface ImageSwiperProps {
  images: string[];
  height: number;
}

const ImageSwiper = ({ images, height }: ImageSwiperProps) => {
  const [displayWidth, setDisplayWidth] = useState<number>();
  const dimensions = useWindowDimensions();

  const [loadTracking, setLoadTracking] = useState<
    {
      index: number;
      isLoading: boolean;
    }[]
  >([]);

  return (
    <ScrollView
      onLayout={(e) => setDisplayWidth(e.nativeEvent.layout.width)}
      style={{
        height: height,
        width: displayWidth,
      }}
      horizontal
      snapToInterval={displayWidth ? displayWidth + 15 : dimensions.width}
      decelerationRate={"fast"}
      contentContainerStyle={{ gap: 15 }}
      showsHorizontalScrollIndicator={false}
    >
      {images.map((image, key) => (
        <View key={key} style={{ position: "relative" }}>
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: Colors.grey, // Adjust the background color and opacity as needed
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="#FFF" />
          </View>
          <Image
            style={{
              width: displayWidth,
              height: height,
              objectFit: "cover",
              borderRadius: 10,
            }}
            source={{ uri: image }}
            onLoadStart={() =>
              setLoadTracking((prev) => [
                ...prev,
                { index: key, isLoading: true },
              ])
            }
            onLoadEnd={() =>
              setLoadTracking((prev) =>
                prev.map((item) =>
                  item.index === key ? { ...item, isLoading: false } : item
                )
              )
            }
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default ImageSwiper;
