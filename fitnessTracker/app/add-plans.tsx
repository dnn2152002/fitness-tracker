import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";

import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Collapsible } from "@/components/Collapsible";
import fitness from "@/data/fitness.json";
import EmptyComponent from "@/components/Empty";
import { useSQLiteContext } from "expo-sqlite";

const buttons = [
  { text: "Nam", onPress: () => {} },
  { text: "Nữ", onPress: () => {} },
];
const calories = {
  Nam: {
    less: 2000,
    ave: 2800,
    more: 3000,
  },
  Nữ: {
    less: 1600,
    ave: 2200,
    more: 2400,
  },
};
export default function AddPlans() {
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = React.useState(false);

  const [plan, setPlan] = React.useState({
    name: "",
    caloIn: 0,
    goal: 0,
  });
  const [sex, setSex] = React.useState(buttons[0].text);
  const [excerises, setExcerises] = React.useState<string[]>([]);
  const [totalKacl, setTotalKacl] = React.useState(0);

  const excessCalo = plan.caloIn - calories[sex as keyof typeof calories].less;
  const deficitCalo = totalKacl - excessCalo;
  const day = (7700 / deficitCalo) * plan.goal;

  const onSavePlan = async () => {
    if (plan.name === "" || excerises.length === 0) {
      return;
    }
    try {
      setIsLoading(true);
      await db.runAsync(
        "INSERT INTO plan_goals (name,goal_weight,caloIn,sex,excerises,duration) VALUES (?,?,?,?,?,?)",
        plan.name,
        plan.goal,
        plan.caloIn,
        sex,
        excerises.join(","),
        day.toFixed(1)
      );
      ToastAndroid.show("Tạo plan thành công!", ToastAndroid.SHORT);
    } catch (error: any) {
      Alert.alert("Lỗi tạo kế hoạch", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">Nhập thông tin kế hoạch</ThemedText>
        <ThemedView style={{ gap: 12 }}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên kế hoạch."
            value={plan.name}
            onChangeText={(text) => setPlan({ ...plan, name: text })}
          />

          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            placeholder="Nhập số cân nặng muốn giảm."
            onChangeText={(text) => setPlan({ ...plan, goal: Number(text) })}
          />
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            placeholder="Ước lượng số calo nạp vào mỗi ngày"
            onChangeText={(text) => setPlan({ ...plan, caloIn: Number(text) })}
          />
          <ThemedView
            style={{
              flexDirection: "row",
              gap: 6,
              backgroundColor: "#f5f5f5",
              justifyContent: "space-around",
              padding: 4,
              borderRadius: 12,
            }}
          >
            {buttons.map(({ text }) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.btnType,
                    {
                      backgroundColor: text === sex ? "white" : "transparent",
                    },
                  ]}
                  key={text}
                  onPress={() => setSex(text)}
                >
                  <Text>{text}</Text>
                </TouchableOpacity>
              );
            })}
          </ThemedView>
        </ThemedView>
        <ThemedView>
          <ThemedText type="defaultSemiBold">Chọn bài tập</ThemedText>
          <FlatList
            contentContainerStyle={{ gap: 12, marginTop: 12 }}
            data={fitness}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => <EmptyComponent />}
            renderItem={({ item }) => {
              const isExist = excerises.includes(item.name);
              const disabledColor = isExist ? "#f5f5f5" : "black";
              return (
                <TouchableOpacity
                  onPress={() => {
                    const value = isExist ? -675 : 675;
                    setTotalKacl((preState) => preState + value);
                    if (isExist) {
                      return setExcerises((pre) =>
                        pre.filter((e) => e !== item.name)
                      );
                    }
                    setExcerises([...excerises, item.name]);
                  }}
                >
                  <ThemedText
                    style={[
                      styles.fitnessBtn,
                      { backgroundColor: disabledColor },
                    ]}
                  >
                    {item.name}
                  </ThemedText>
                </TouchableOpacity>
              );
            }}
          />
        </ThemedView>
        <ThemedText>
          Lượng calo trung bình mà một người trưởng thành cần tiêu thụ mỗi ngày.
        </ThemedText>
        <ThemedView>
          <Collapsible title="Nam giới:">
            <ThemedText>Ít vận động: ~2.000 - 2.400 calo/ngày</ThemedText>
            <ThemedText>Vận động vừa phải: ~2.200 - 2.800 calo/ngày</ThemedText>
            <ThemedText>Vận động Nhiều: ~2.400 - 3.000 calo/ngày</ThemedText>
          </Collapsible>
          <Collapsible title="Nữ giới:">
            <ThemedText>Ít vận động: ~1.600 - 2.000 calo/ngày</ThemedText>
            <ThemedText>Vận động vừa phải: ~1.800 - 2.200 calo/ngày</ThemedText>
            <ThemedText>Vận động Nhiều: ~2.000 - 2.400 calo/ngày</ThemedText>
          </Collapsible>
        </ThemedView>
        <ThemedView>
          <ThemedText>
            <ThemedText type="defaultSemiBold">Bài tập: </ThemedText>{" "}
            {excerises.join(", ")}
          </ThemedText>
          <ThemedText>
            Lượng calo dư thừa:
            {excessCalo} kacl
          </ThemedText>
          <ThemedText>Lượng calo từ bài tập: {totalKacl} kacl</ThemedText>
          <ThemedText>Lượng calo thâm hụt: {deficitCalo} kacl</ThemedText>

          <ThemedText>
            {day < 0
              ? `Bạn sẽ tăng ${plan.goal} kg trong ${Math.abs(day).toFixed(
                  1
                )} ngày`
              : `Cần ${day.toFixed(1)} ngày để giảm ${plan.goal} kg`}
          </ThemedText>
        </ThemedView>
        <TouchableOpacity
          disabled={plan.name === "" || excerises.length === 0}
          onPress={onSavePlan}
          activeOpacity={0.9}
        >
          <ThemedView style={styles.btn}>
            {isLoading && <ActivityIndicator color="white" />}
            <ThemedText style={{ color: "white", fontWeight: "500" }}>
              Lưu
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 12,
  },
  btn: {
    backgroundColor: "black",
    padding: 12,
    // marginHorizontal: 15,
    flexDirection: "row",
    gap: 8,
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
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnType: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  fitnessBtn: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 6,
    backgroundColor: "black",
    color: "white",
  },
});
