import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { isLoading } from "expo-font";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type ButtonProps = TouchableOpacityProps & {
  onPress?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  text?: string;
};

export default function Button({
  isLoading,
  onPress,
  text = "Lưu",
  ...otherProps
}: ButtonProps) {
  return (
    <TouchableOpacity {...otherProps} onPress={onPress} activeOpacity={0.9}>
      <ThemedView style={styles.btn}>
        {isLoading && <ActivityIndicator color="white" />}
        <ThemedText style={{ color: "white", fontWeight: "500" }}>
          {text}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    gap: 6,
    backgroundColor: "black",
    padding: 12,
    // marginHorizontal: 15,
    flexDirection: "row",
    marginVertical: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
