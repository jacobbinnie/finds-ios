import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { FlatList } from "react-native-gesture-handler";
import ReviewCard from "../ReviewCard/ReviewCard";
import { Theme } from "@/constants/Styles";
import { Divider } from "react-native-elements";

interface FindReviewsProps {
  id: string;
}

const FindReviews = ({ id }: FindReviewsProps) => {
  const {
    data: reviews,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await supabase
        .from("finds")
        .select(
          `
        id,
        created_at,
        profile (
          id,
          firstname,
          username,
          image
        ),
        review,
        rating,
        places (
          id,
          name,
          locality
        )
        `
        )
        .eq("place", id);

      return response;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 10, gap: 10 }}>
      <Text style={Theme.Title}>All Reviews</Text>
      <FlatList
        data={reviews?.data}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginVertical: 10 }} />
        )}
        renderItem={(item) => (
          <ReviewCard
            id={item.item.id}
            createdAt={item.item.created_at}
            profile={item.item.profile}
            rating={item.item.rating}
            review={item.item.review}
          />
        )}
      />
    </View>
  );
};

export default FindReviews;
