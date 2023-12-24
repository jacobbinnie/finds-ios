import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { FlatList } from "react-native-gesture-handler";
import ReviewCard from "../ReviewCard/ReviewCard";
import { Theme } from "@/constants/Styles";
import { Divider } from "react-native-elements";
import { FindReviewsDto, FindReviewsQuery } from "@/types/queries";

interface FindReviewsProps {
  id: string;
}

const FindReviews = ({ id }: FindReviewsProps) => {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery<FindReviewsDto>({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("finds")
        .select(FindReviewsQuery)
        .eq("place", id);

      if (error) throw error;
      return data;
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
        data={reviews}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginVertical: 10 }} />
        )}
        renderItem={(item) => <ReviewCard review={item.item} />}
      />
    </View>
  );
};

export default FindReviews;
