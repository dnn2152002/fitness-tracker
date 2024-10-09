import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyComponent = ({ message = "Không có dữ liệu" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    color: "#888",
  },
});

export default EmptyComponent;
