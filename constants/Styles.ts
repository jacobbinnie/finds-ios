import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const Theme = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingHorizontal: 15,
  },

  Button: {
    borderWidth: 1,
    borderColor: Colors.dark,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 99,
  },
  ButtonText: {
    color: Colors.dark,
    fontFamily: "font-b",
    fontSize: 16,
  },
  Title: {
    fontFamily: "font-b",
    color: Colors.dark,
    fontSize: 18,
  },
  BodyText: {
    fontFamily: "font-m",
    fontSize: 16,
    color: Colors.dark,
    lineHeight: 20,
  },
  ReviewText: {
    fontFamily: "font-mi",
    fontSize: 14,
    color: Colors.dark,
    lineHeight: 20,
  },
  Caption: {
    fontFamily: "font-m",
    fontSize: 14,
    color: Colors.dark,
  },
});
