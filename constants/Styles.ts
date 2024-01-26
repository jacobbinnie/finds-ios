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
    fontFamily: "font-m",
    fontSize: 16,
  },
  BigTitle: {
    fontFamily: "font-b",
    color: Colors.dark,
    fontSize: 32,
  },
  Title: {
    fontFamily: "font-b",
    color: Colors.dark,
    fontSize: 18,
  },
  Subtitle: {
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
  InputStyle: {
    fontFamily: "font-m",
    fontSize: 16,
    color: Colors.dark,
    height: 50,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.light,
  },
});
