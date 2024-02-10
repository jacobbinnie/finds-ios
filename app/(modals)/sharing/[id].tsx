import {
  View,
  Text,
  useWindowDimensions,
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ViewShot from "react-native-view-shot";
import ImageSwiper from "@/components/ImageSwiper/ImageSwiper";
import { Theme } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { findsQuery } from "@/types/queries";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import Share, { Social } from "react-native-share";

const Sharing = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data } = useQuery(findsQuery.findsControllerGetFindById(id));

  const dimensions = useWindowDimensions();

  const ref = useRef<ViewShot>(null);

  const [hasInstagramInstalled, setHasInstagramInstalled] = useState(false);

  useEffect(() => {
    Linking.canOpenURL("instagram://")
      .then((val) => setHasInstagramInstalled(val))
      .catch((err) => console.error(err));
  }, []);

  async function captureAndShare() {
    try {
      const uri = await captureRef(ref, {
        format: "png",
        quality: 1,
      });

      if (hasInstagramInstalled) {
        await Share.shareSingle({
          appId: "617715657165022",
          stickerImage: uri,
          social: Social.InstagramStories,
          backgroundBottomColor: Colors.dark,
          backgroundTopColor: Colors.dark,
        });
      } else {
        await Share.open({ url: uri });
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!data?.images) {
    return <Loader />;
  }

  return (
    <View style={{ position: "relative", padding: 15 }}>
      <View
        style={{
          shadowColor: Colors.grey,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          backgroundColor: "#FFF",
          shadowOpacity: 0.2,
          shadowRadius: 2.62,
        }}
      >
        <ViewShot ref={ref} options={{ format: "jpg", quality: 1 }}>
          <ImageSwiper
            isSwipable={data.images.length > 1}
            images={data.images}
            height={dimensions.height * 0.5}
            hideOverlays
          />

          <View
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
            }}
          >
            <Text
              style={[
                Theme.Logo,
                {
                  color: Colors.light,
                },
              ]}
            >
              finds
            </Text>
          </View>
        </ViewShot>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 30,
        }}
      >
        <Text style={Theme.Title}>Share to</Text>

        <TouchableOpacity
          onPress={() => captureAndShare()}
          style={{
            padding: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Feather name="instagram" size={35} color="black" />
          <Text style={Theme.Caption}>IG Story</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sharing;
