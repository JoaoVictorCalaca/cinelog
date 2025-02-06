import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const defaultStyles = StyleSheet.create({
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

  defaultTextColor: {
    color: colors.gray
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  colorBlack: {
    color: colors.black
  }
})

export const iconSize = 17