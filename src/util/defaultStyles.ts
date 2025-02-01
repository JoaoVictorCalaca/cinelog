import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const defalutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },

  h1: {
    fontSize: 20
  },

  paragraph: {
    fontSize: 14
  },

  colorWhite: {
    color: colors.white
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const iconSize = 17