import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

interface ImageSwiperProps {
  images: string[];
  height: number;
  onPressCallback?: () => void;
  isSwipable?: boolean;
  hideOverlays?: boolean;
}

const ImageSwiper = ({
  images,
  height,
  onPressCallback,
  isSwipable,
  hideOverlays,
}: ImageSwiperProps) => {
  const [displayWidth, setDisplayWidth] = useState<number>();
  const dimensions = useWindowDimensions();

  const [loadTracking, setLoadTracking] = useState<
    {
      index: number;
      isLoading: boolean;
    }[]
  >([]);

  if (!images) {
    return null;
  }

  return (
    <View style={{ position: "relative" }}>
      {images.length > 1 && (
        <View
          style={{
            position: "absolute",
            bottom: 15,
            right: 15,
            zIndex: 10,
            display: "flex",
            gap: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            style={{ opacity: hideOverlays ? 0 : 1 }}
            name="photo-library"
            size={24}
            color={Colors.light}
          />
        </View>
      )}

      <ScrollView
        scrollEnabled={isSwipable ?? false}
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPressCallback}
            key={key}
            style={{ position: "relative" }}
          >
            {loadTracking.find((item) => item.index === key)?.isLoading && (
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
            )}

            <Image
              style={{
                width: displayWidth,
                height: height,
                objectFit: "cover",
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
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ImageSwiper;
