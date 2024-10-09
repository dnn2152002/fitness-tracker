import React from "react";
import { View, ActivityIndicator, Text, StyleSheet, Image } from "react-native";

type LoaderProps = {
  loading: boolean;
  message: string;
};

const Loader = ({ loading, message }: LoaderProps) => {
  if (!loading) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/loading.gif")}
        style={styles.logo}
      />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Loader;
