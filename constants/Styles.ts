import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const Theme = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.light,
    padding: 10,
    gap: 20,
  },
  Button: {
    borderWidth: 1,
    borderColor: Colors.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 99,
  },
  ButtonText: {
    fontSize: 15,
    color: Colors.primary,
    fontFamily: "agr-wh",
  },
  Title: {
    fontSize: 20,
    fontFamily: "agr-wh",
    color: Colors.primary,
  },
});
