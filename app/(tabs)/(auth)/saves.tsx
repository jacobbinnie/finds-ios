import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  UIManager,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "@/constants/Styles";
import Search from "@/components/Search/Search";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import Colors from "@/constants/Colors";
import Save from "@/components/Save/Save";
import { savesQuery } from "@/types/queries";

const Saves = () => {
  const [findHeight, setFindHeight] = useState<number | undefined>(undefined);
  const { session } = useAuth();

  useEffect(() => {
    // Enable layout animation
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);

  const {
    data: saves,
    isLoading,
    isError,
    refetch,
  } = useQuery(savesQuery.savesControllerGetUserSaves());

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <View style={{ flex: 1, gap: 15 }}>
      <SafeAreaView />

      <View style={{ paddingHorizontal: 15 }}>
        <Search />
      </View>

      {/* <Categories /> */}

      <View
        style={Theme.Container}
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
        <Text style={[Theme.Title, { marginBottom: 15 }]}>My saves</Text>

        {findHeight && (
          <FlatList
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              overflow: "hidden",
              flexGrow: 1,
            }}
            decelerationRate={"fast"}
            viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
            pagingEnabled={true}
            onRefresh={() => refetch()}
            refreshing={isLoading}
            data={saves}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            snapToInterval={findHeight / 2 + 20}
            ItemSeparatorComponent={() => (
              <View style={{ paddingVertical: 10 }} />
            )}
            renderItem={({ item }) => (
              <Save saveHeight={findHeight / 2} find={item.find} />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Saves;
