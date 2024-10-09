import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";
import React from "react";

export default function Webview(props: any) {
  const route: any = useRoute();
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, []);
  return (
    <WebView style={styles.container} source={{ uri: route.params.uri }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
});
