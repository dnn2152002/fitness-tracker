import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FitnessCards from "../../components/FitnessCard";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { FitnessItems } from "../../Context";
import React from "react";
import { useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import GoalCard from "@/components/GoalCard";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {
  const db = useSQLiteContext();

  const navigation: any = useNavigation();
  const isFocused = useIsFocused();

  const { calories, minutes, workout, setCalories, setWorkout, setMinutes } =
    useContext(FitnessItems);
  const [goalPlans, setGoalPlans] = React.useState<any[]>([]);

  React.useEffect(() => {
    const initPlanData = async () => {
      const goals = await db.getAllAsync(`
        SELECT 
          pg.*,
          COALESCE(SUM(pt.min), 0) as total_minutes,
          COALESCE(COUNT(DISTINCT pt.date), 0) as days_tracked,
          CASE 
            WHEN pg.duration > 0 THEN ROUND(COALESCE(COUNT(DISTINCT pt.date), 0) * 100.0 / pg.duration, 2)
            ELSE 0
          END as progress_percentage
        FROM plan_goals pg
        LEFT JOIN progress_tracking pt ON pg.id = pt.plan_id
        GROUP BY pg.id
      `);
      
      const plan: any = await db.getFirstAsync(
        `SELECT SUM(min) AS total_min, 
                SUM(workout) AS total_workout, 
                SUM(calo_consumed) AS total_calo_consumed
        FROM progress_tracking
        WHERE date = ?;`,
        new Date().toLocaleDateString()
      );
      if (plan.total_calo_consumed !== null && plan.total_min !== null) {
        const { total_calo_consumed, total_min, total_workout } = plan;
        setCalories(total_calo_consumed);
        setMinutes(total_min);
        setWorkout(total_workout);
      }
      console.log(goals)
      setGoalPlans(goals);
    };
    initPlanData();
  }, [isFocused]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
      <View
        style={{
          backgroundColor: "#000000d7",
          paddingTop: 40,
          paddingHorizontal: 20,
          height: 160,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 50,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            FITNESS TRACKING
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("add-plans")}>
            <Ionicons name="add-circle-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {calories.toFixed(2)}
            </Text>
            <Text>KCAL</Text>
          </View>

          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{workout}</Text>
            <Text>WORKOUTS</Text>
          </View>

          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{minutes}</Text>
            <Text>PHÚT</Text>
          </View>
        </View>
      </View>
      <GoalCard data={goalPlans} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  shadowCards: {
    backgroundColor: "#ffffff",
    width: "32%",
    height: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
