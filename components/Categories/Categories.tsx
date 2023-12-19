import { View, Text, ScrollView, Touchable } from "react-native";
import React from "react";
import { categories } from "./Categories.json";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Theme } from "@/constants/Styles";
import Colors from "@/constants/Colors";

type Category = {
  name: string;
  icon: string;
};

type Categories = {
  [key: string]: Category;
};

const AllCategories: Categories = categories;

const Categories = () => {
  return (
    <View style={{ padding: 0, flexGrow: 0 }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flexGrow: 0 }}
      >
        {Object.keys(AllCategories).map((category, id) => {
          return (
            <TouchableOpacity
              key={id}
              style={{
                paddingHorizontal: 20,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text style={{ fontSize: 20 }}>
                {AllCategories[category].icon}
              </Text>
              <Text style={{ fontFamily: "font-b" }}>
                {AllCategories[category].name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
