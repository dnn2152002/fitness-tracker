import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";

import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { FitnessItems } from "@/Context";
import { Picker } from "@react-native-picker/picker";
import { useSQLiteContext } from "expo-sqlite";

const buttons = [
  { text: "Calories", onPress: () => { } },
  { text: "Cân nặng", onPress: () => { } },
  { text: "Món ăn", onPress: () => { } },
];

const days = ["S", "M", "T", "W", "Th", "F", "Sa"];

export default function activities() {
  const db = useSQLiteContext();

  const { calories, workout, setIsLoading } = useContext(FitnessItems);
  const [barChartData, setBarChartData] = React.useState<barDataItem[]>([]);
  const [type, setType] = React.useState(buttons[0].text);
  const [selectedFilter, setSelectedFilter] = React.useState("");

  React.useEffect(() => {
    const init = async () => {
      const barData = [
        { value: 0, label: "M" },
        { value: 0, label: "T", frontColor: "#177AD5" },
        { value: 0, label: "W", frontColor: "#177AD5" },
        { value: 0, label: "Th" },
        { value: 0, label: "F", frontColor: "#177AD5" },
        { value: 0, label: "Sa" },
        { value: 0, label: "S" },
      ];
      if (type === "Món ăn") {
        const result = await db.getAllAsync<any>(
          `SELECT * FROM daily_calories;`
        );
        const bardata = result.map((row) => {
          return {
            value: row.total_food,
            label: days[new Date(row.date).getDay()],
          };
        });
        console.log(result);
        setBarChartData(bardata);
      }
      if (type === "Calories") {
        setBarChartData(barData);
      }
      if (type === "Cân nặng") {
        Alert.alert("Comming soon", "Chức năng chưa hỗ trợ");
        return;
      }
    };
    init();
  }, [type]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 20, paddingHorizontal: 12, backgroundColor: "white" }}
    >
      <SafeAreaView style={styles.gap}>
        <ThemedText style={{ paddingTop: 40, color: "black" }} type="title">
          Thống kê
        </ThemedText>
        <View style={{ flexDirection: "row" }}>
          <ThemedView
            style={{
              flexDirection: "row",
              flex: 1,
              gap: 6,
              backgroundColor: "#f5f5f5",
              justifyContent: "space-around",
              padding: 4,
              borderRadius: 12,
            }}
          >
            {buttons.map(({ text, onPress }) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.btnType,
                    {
                      backgroundColor: text === type ? "white" : "transparent",
                    },
                  ]}
                  key={text}
                  onPress={() => setType(text)}
                >
                  <Text>{text}</Text>
                </TouchableOpacity>
              );
            })}
          </ThemedView>
          <Picker
            style={{ backgroundColor: "white", width: "40%", maxHeight: 60 }}
            selectedValue={selectedFilter}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedFilter(itemValue)
            }
          >
            <Picker.Item label="Tuần" value="weekly" />
            <Picker.Item label="Tháng" value="monthly" />
            <Picker.Item label="Năm" value="yearly" />
          </Picker>
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.shadowCards}>
            <View style={styles.overviewText}>
              <Text>Workout</Text>
              <Ionicons name="bicycle" size={24} color="black" />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{workout}</Text>
            <Text>Phút</Text>
          </View>
          <View style={styles.shadowCards}>
            <View style={styles.overviewText}>
              <Text>Plans</Text>
              <Ionicons name="albums-outline" size={24} color="black" />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{workout}</Text>
            <Text>Cái</Text>
          </View>
        </View>

        <View style={styles.gap}>
          <ThemedText type="subtitle">Calories</ThemedText>
          <ThemedText type="title">{calories} kcal</ThemedText>
        </View>
        <View style={styles.gap}>
          <ThemedText type="subtitle">Phân tích</ThemedText>
          <BarChart
            barWidth={22}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="lightgray"
            data={barChartData}
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
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
    justifyContent: "space-around",
  },

  overviewContainer: {
    padding: 12,
    backgroundColor: "#272727",
    color: "white",
  },
  overviewText: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  shadowCards: {
    backgroundColor: "#ffffff",
    width: "45%",
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gap: {
    gap: 12,
  },
  btnType: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
