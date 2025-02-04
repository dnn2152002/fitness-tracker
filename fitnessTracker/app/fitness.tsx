import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useContext } from "react";
import { FitnessItems } from "../Context";
import { useSQLiteContext } from "expo-sqlite";

const FitScreen = () => {
  const db = useSQLiteContext();

  const route: any = useRoute();
  const navigation: any = useNavigation();
  const [index, setIndex] = useState(0);
  const exercise = route.params.exercises;
  const current = exercise[index];

  const planId = route.params.planId;

  const {
    completed,
    setCompleted,
    calories,
    setCalories,
    minutes,
    setMinutes,
    workout,
    setWorkout,
  } = useContext(FitnessItems);

  return (
    <SafeAreaView>
      <Image
        style={{ width: "100%", height: 400 }}
        source={{ uri: current?.image }}
      />

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        {current?.name} <Octicons name="question" size={22} color="#6d6868" />
      </Text>

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: 45,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        x{current?.sets}
      </Text>

      {/* Done Button  */}
      {index + 1 >= exercise.length ? (
        <TouchableOpacity
          onPress={async () => {
            // TODO:

            const result: any = await db.getFirstAsync(
              "SELECT * FROM progress_tracking WHERE plan_id=? AND date=?;",
              planId,
              new Date().toLocaleDateString()
            );

            let min = minutes + 2.5;
            let calo_consumed = calories + 6.3;
            let workoutCount = workout + 1;

            if (result !== null) {
              await db.runAsync(
                "UPDATE progress_tracking SET min=?,calo_consumed=?,workout=? WHERE plan_id=? AND date=?;",
                (min += result.min),
                (calo_consumed += result.calo_consumed),
                (workoutCount += result.workout),
                planId,
                new Date().toLocaleDateString()
              );
            } else {
              await db.runAsync(
                "INSERT INTO progress_tracking (plan_id,date,min,calo_consumed,workout) VALUES (?,?,?,?,?);",
                planId,
                new Date().toLocaleDateString(),
                min,
                calo_consumed,
                workoutCount
              );
            }

            navigation.navigate("home");
            setCompleted([...completed, current?.name]);
            setWorkout(workout + 1);
            setMinutes(minutes + 2.5);
            setCalories(calories + 6.3);
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "#198f51",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 50,
            borderRadius: 30,
            padding: 10,
            width: "90%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            <Ionicons name="checkmark-circle" size={24} color="white" /> DONE
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Rest");
            setCompleted([...completed, current?.name]);
            setWorkout(workout + 1);
            setMinutes(minutes + 2.5);
            setCalories(calories + 6.3);
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "#198f51",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 50,
            borderRadius: 30,
            padding: 10,
            width: "90%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            <Ionicons name="checkmark-circle" size={24} color="white" /> DONE
          </Text>
        </TouchableOpacity>
      )}

      {/* Previous Button  */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginTop: 25,
        }}
      >
        <TouchableOpacity
          disabled={index === 0}
          onPress={() => {
            navigation.navigate("Rest");
            setTimeout(() => {
              setIndex(index - 1);
            }, 2000);
          }}
          style={{ borderRadius: 30, padding: 10, width: "42%" }}
        >
          <Text
            style={{
              color: "#6d6868",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            <Ionicons name="play-skip-back" size={22} color="#6d6868" /> PREV
          </Text>
        </TouchableOpacity>

        {/* Skip Button  */}
        {index + 1 >= exercise.length ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("home");
            }}
            style={{ borderRadius: 30, padding: 10, width: "42%" }}
          >
            <Text
              style={{
                color: "#3f3d3d",
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              <Ionicons name="play-skip-forward" size={22} color="#3f3d3d" />{" "}
              SKIP
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Rest");

              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }}
            style={{ borderRadius: 30, padding: 10, width: "42%" }}
          >
            <Text
              style={{
                color: "#3f3d3d",
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              <Ionicons name="play-skip-forward" size={22} color="#3f3d3d" />{" "}
              SKIP
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FitScreen;
