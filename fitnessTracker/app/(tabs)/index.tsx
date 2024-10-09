import {
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FoodCard from "@/components/FoodCard";
import foods from "../../data/foods.json";
import { Collapsible } from "@/components/Collapsible";
import React, { useContext } from "react";
import EmptyComponent from "@/components/Empty";
import { Ionicons } from "@expo/vector-icons";
import { FitnessItems } from "@/Context";
import { useSQLiteContext } from "expo-sqlite";

type Food = {
  ten_mon_an: string;
  hinh_anh: string;
  calo: number;
};

export default function HomeScreen() {
  const db = useSQLiteContext();

  const [isLoading, setIsLoading] = React.useState(false);
  const { calories, setCalories } = useContext(FitnessItems);
  const [selectedFoods, setSelectedFoods] = React.useState<Array<Food>>([]);
  const handleOnPress = (food: Food) => {
    setCalories(calories - food.calo);
    setSelectedFoods([...selectedFoods, food]);
  };
  const onSaveFood = async () => {
    if (selectedFoods.length === 0) {
      return;
    }
    setIsLoading(true);
    try {
      const result = await db.getFirstAsync(
        `SELECT * FROM daily_calories WHERE date = ?;`,
        new Date().toLocaleDateString()
      );
      if (result === null) {
        await db.runAsync(
          "INSERT INTO daily_calories (date, total_calories,total_food) VALUES (?, ?,?);",
          new Date().toLocaleDateString(),
          calories,
          selectedFoods.length
        );
      } else {
        await db.runAsync(
          "UPDATE daily_calories SET  total_calories=?,total_food =? WHERE date =?;",
          calories,
          selectedFoods.length,
          new Date().toLocaleDateString()
        );
      }
      ToastAndroid.show("Lưu thành công!", ToastAndroid.SHORT);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/10008/10008839.png",
          }}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Chọn món ăn</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>
        Tính toán và lưu trữ kcal dựa trên các món đã chọn.
      </ThemedText>
      <ThemedView>
        <ThemedText type="subtitle">Món ăn đã chọn</ThemedText>
        <FlatList
          horizontal
          contentContainerStyle={{ gap: 6 }}
          data={selectedFoods}
          ListEmptyComponent={() => <EmptyComponent />}
          renderItem={({ item }) => {
            const { ten_mon_an, hinh_anh, calo } = item;
            return (
              <ThemedView style={{ flexDirection: "row" }}>
                <FoodCard
                  key={ten_mon_an}
                  name={ten_mon_an}
                  image={hinh_anh}
                  kcal={calo}
                />
                <TouchableOpacity
                  onPress={() =>
                    setSelectedFoods((preState) => {
                      return preState.filter((item) => {
                        if (item.ten_mon_an === ten_mon_an) {
                          setCalories(calories - item.calo);
                        }
                        return item.ten_mon_an !== ten_mon_an;
                      });
                    })
                  }
                  style={{ marginLeft: 6 }}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </ThemedView>
            );
          }}
        />
        <ThemedView>
          <ThemedText>
            Đã ăn: {selectedFoods.length} món ,Kacl {calories}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Miền Bắc</ThemedText>

        <Collapsible title="Xem thêm">
          {foods.mien_bac.map((food) => {
            const { ten_mon_an, hinh_anh, calo } = food;
            return (
              <TouchableOpacity
                key={food.ten_mon_an}
                activeOpacity={0.5}
                onPress={() => handleOnPress(food)}
              >
                <FoodCard
                  isShowAdd
                  name={ten_mon_an}
                  image={hinh_anh}
                  kcal={calo}
                />
              </TouchableOpacity>
            );
          })}
        </Collapsible>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Miền Trung</ThemedText>
        <Collapsible title="Xem thêm">
          {foods.mien_trung.map((food) => {
            const { ten_mon_an, hinh_anh, calo } = food;
            return (
              <TouchableOpacity
                key={food.ten_mon_an}
                activeOpacity={0.5}
                onPress={() => handleOnPress(food)}
              >
                <FoodCard
                  isShowAdd
                  key={food.ten_mon_an}
                  name={ten_mon_an}
                  image={hinh_anh}
                  kcal={calo}
                />
              </TouchableOpacity>
            );
          })}
        </Collapsible>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Miền Nam</ThemedText>
        <Collapsible title="Xem thêm">
          {foods.mien_nam.map((food) => {
            const { ten_mon_an, hinh_anh, calo } = food;
            return (
              <TouchableOpacity
                key={food.ten_mon_an}
                activeOpacity={0.5}
                onPress={() => handleOnPress(food)}
              >
                <FoodCard
                  isShowAdd
                  key={food.ten_mon_an}
                  name={ten_mon_an}
                  image={hinh_anh}
                  kcal={calo}
                />
              </TouchableOpacity>
            );
          })}
        </Collapsible>
        <TouchableOpacity onPress={onSaveFood} activeOpacity={0.9}>
          <ThemedView style={styles.btn}>
            {isLoading && <ActivityIndicator color="white" />}
            <ThemedText style={{ color: "white", fontWeight: "500" }}>
              Lưu
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 258,
    width: 250,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
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
