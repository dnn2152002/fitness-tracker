import { Image, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";

type FoodCardProps = {
  image: string;
  name: string;
  kcal: number;
  isShowAdd?: boolean;
};

export default function FoodCard({
  image,
  name,
  kcal,
  isShowAdd = false,
}: FoodCardProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.container, { flex: 1 }]}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <ThemedView>
          <ThemedText type="defaultSemiBold">{name}</ThemedText>
          <ThemedText>Kacl {kcal}</ThemedText>
        </ThemedView>
      </ThemedView>
      {isShowAdd && (
        <Ionicons name="add-circle-outline" size={24} color="black" />
      )}
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 12,
  },
});
