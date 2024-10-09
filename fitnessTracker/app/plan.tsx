import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import FitnessCards from "@/components/FitnessCard";
import { ThemedView } from "@/components/ThemedView";
import EmptyComponent from "@/components/Empty";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function Plan() {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const db = useSQLiteContext();
  const [plan, setPlan] = React.useState<any>({});
  const [progressTracking, setProgressTracking] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const id = route.params.id;
  const [isFresh, setIsFresh] = React.useState(false);
  const isStarted = plan.status === "Not Started";
  React.useEffect(() => {
    navigation.setOptions({ title: route.params.name });
    const init = async () => {
      const result: any = await db.getFirstAsync(
        "SELECT * FROM plan_goals WHERE id =?;",
        id
      );
      const tracking = await db.getAllAsync(
        "SELECT * FROM progress_tracking WHERE plan_id=?;",
        id
      );
      setProgressTracking(tracking);
      setPlan(result);
    };

    init();
  }, [isFresh]);
  const onStart = async () => {
    setIsLoading(true);
    try {
      await db.runAsync(
        "UPDATE  plan_goals SET status='In Progress' WHERE id =?;",
        id
      );
      ToastAndroid.show("Đã bắt đầu!", ToastAndroid.SHORT);
      setIsFresh(!isFresh);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Lỗi đổi trạng thái", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const makeAsCompleted = async () => {
    setIsLoading(true);
    try {
      await db.runAsync(
        "UPDATE  plan_goals SET status='Completed' WHERE id =?;",
        id
      );
      const res = await AsyncStorage.getItem("PERSON")
      if (res) {
        const userInfo = JSON.parse(res)
        const weigth = userInfo.weigth - plan.goal_weight
        AsyncStorage.setItem("PERSON", JSON.stringify({ ...userInfo, weigth }))
      }
      ToastAndroid.show("Đã Hoàn thành!", ToastAndroid.SHORT);
    } catch (error: any) {
      Alert.alert("Lỗi đổi trạng thái", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          width={500}
          height={300}
          source={{
            uri: "https://drinkprotein2o.com/wp-content/uploads/2017/01/The-EASY-7-day-fitness-plan-anyone-can-master.jpg",
          }}
        />
      }
    >
      <ThemedText type="title">Mục tiêu</ThemedText>
      <ThemedText>
        Ngày tạo: {new Date(plan.created_at).toLocaleDateString()}
      </ThemedText>
      <ThemedText>Calo giới hạn: {plan.caloIn}</ThemedText>
      <ThemedText>Giảm: {plan.goal_weight} kg</ThemedText>
      <ThemedText>Thời gian: {plan.duration} ngày</ThemedText>
      <ThemedText type="title">Bài tập</ThemedText>

      <FitnessCards
        planId={id}
        isDisabled={isStarted || plan.status === "Completed"}
        excerises={plan.excerises || ""}
      />
      <ThemedText type="title">Tiến độ</ThemedText>
      {progressTracking.length === 0 ? (
        <EmptyComponent />
      ) : (
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <ThemedText style={styles.tableHeader}>Ngày</ThemedText>
            <ThemedText style={styles.tableHeader}>Calo tiêu thụ</ThemedText>
            <ThemedText style={styles.tableHeader}>Thời gian</ThemedText>
          </View>
          {progressTracking.map((progress) => (
            <View style={styles.tableRow} key={progress.id}>
              <ThemedText style={styles.tableCell}>{progress.date}</ThemedText>
              <ThemedText style={styles.tableCell}>{progress.calo_consumed} Kcal</ThemedText>
              <ThemedText style={styles.tableCell}>{progress.min} phút</ThemedText>
            </View>
          ))}
        </View>
      )}

      { plan.status !== "Completed" && <Button
        disabled={progressTracking < plan.duration && !isStarted}
        isLoading={isLoading}
        onPress={isStarted ? onStart : makeAsCompleted}
        text={isStarted ? "Bắt đầu" : "Hoàn thành"}
      />}
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "white",
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
});
