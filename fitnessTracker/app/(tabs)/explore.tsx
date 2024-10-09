import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

import data from "@/data/blogs.json";
import EmptyComponent from "@/components/Empty";
import { useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

export default function Explore() {
  // const db = useSQLiteContext();

  // React.useEffect(() => {
  //   async function setup() {
  //     const result = await db.getAllAsync<any>('SELECT * FROM todos');
  //     console.log(result);
  //   }
  //   setup();
  // }, []);
  const navigation: any = useNavigation();
  const [blogs, setBlogs] = React.useState<typeof data>([]);
  const [videos, setVideos] = React.useState<typeof data>([]);
  React.useEffect(() => {
    setBlogs(data.filter((item) => item.type === "Dinh dưỡng"));
    setVideos(data.filter((item) => item.type !== "Dinh dưỡng"));
  }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          width={500}
          height={300}
          source={{
            uri: "https://movewithus.com/cdn/shop/articles/Motivation_Vs._Dicipline_d312db3e-31be-4b7f-aabb-2e7fa4d3736f.jpg?v=1636611405",
          }}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Khám phá</ThemedText>
      </ThemedView>
      <ThemedText>
        Kỷ luật giúp bạn có thể chạm vào đích đến của mọi mục tiêu.
      </ThemedText>
      <Collapsible title="Blogs về dinh dưỡng">
        <FlatList
          contentContainerStyle={{ gap: 12 }}
          data={blogs}
          horizontal
          keyExtractor={(item) => item.name}
          ListEmptyComponent={() => <EmptyComponent />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ width: 200, gap: 8 }}
                onPress={() =>
                  navigation.navigate("webView", {
                    uri: item.url,
                    name: item.name,
                  })
                }
              >
                <Ionicons name="bicycle-sharp" size={24} color="black" />
                <ThemedText
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  type="defaultSemiBold"
                >
                  {item.name}
                </ThemedText>
                <ThemedView
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <ThemedText>{item.type}</ThemedText>
                  <ThemedText>{item.date}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            );
          }}
        />
      </Collapsible>
      <Collapsible title="Video huấn luyện">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the
          web version, press <ThemedText type="defaultSemiBold">w</ThemedText>{" "}
          in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Danh sách PT nổi tiếng">
        <ThemedText>
          For static images, you can use the{" "}
          <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to
          provide files for different screen densities
        </ThemedText>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ alignSelf: "center" }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Danh sách phòng tập">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText>{" "}
          to see how to load{" "}
          <ThemedText style={{ fontFamily: "SpaceMono" }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Những bài tập phổ biến">
        <ThemedText>
          This template has light and dark mode support. The{" "}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook
          lets you inspect what the user's current color scheme is, and so you
          can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Nhóm thực phẩm tăng cơ giảm mỡ">
        <ThemedText>
          This template includes an example of an animated component. The{" "}
          <ThemedText type="defaultSemiBold">
            components/HelloWave.tsx
          </ThemedText>{" "}
          component uses the powerful{" "}
          <ThemedText type="defaultSemiBold">
            react-native-reanimated
          </ThemedText>{" "}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The{" "}
              <ThemedText type="defaultSemiBold">
                components/ParallaxScrollView.tsx
              </ThemedText>{" "}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  blogCard: {},
});
