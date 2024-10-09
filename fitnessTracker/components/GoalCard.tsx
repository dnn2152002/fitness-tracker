import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import EmptyComponent from "./Empty";
import { PieChart } from "react-native-gifted-charts";

type GoalCardProps = {
  data: any[];
};

const textColors = {
  "Not Started": {
    color: "#D6EFD8",
    text: "Chưa bắt đầu",
    icon: "ellipse-outline",
  },
  "In Progress": {
    color: "#80AF81",
    text: "Đang thực hiện",
    icon: "time-outline",
  },
  Completed: {
    color: "#1A5319",
    text: "Hoàn thành",
    icon: "checkmark-circle-outline",
  },
};

export default function GoalCard({ data }: GoalCardProps) {
  const navigation: any = useNavigation();
  const [filter, setFilter] = useState<string | null>("In Progress");

  const filteredData = filter ? data.filter(goal => goal.status === filter) : data;

  const FilterButton = ({ status }: { status: string }) => (
    <TouchableOpacity
      style={{
        padding: 8,
        backgroundColor: 'black',
        borderRadius: 8,
        marginLeft: 8,
      }}
      onPress={() => setFilter(filter === status ? null : status)}
    >
      <Ionicons
        name={textColors[status as keyof typeof textColors].icon}
        size={24}
        color={filter === status ? 'white' : 'gray'}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ marginTop: 60, marginHorizontal: 20, marginBottom: 20, gap: 24 }}>
      <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
        <FilterButton status="Not Started" />
        <FilterButton status="In Progress" />
        <FilterButton status="Completed" />
      </View>
      {filteredData.length === 0 ? (
        <EmptyComponent />
      ) : (
        filteredData.map((goal) => {
          const percent = goal.progress_percentage > 100 ? 100 : goal.progress_percentage;

          return <TouchableOpacity
            onPress={() =>
              navigation.navigate("plan", { id: goal.id, name: goal.name })
            }
            key={goal.id}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.7)",
                zIndex: 1,
                borderRadius: 12,
              }}
            />
            <Image
              style={{
                width: "100%",
                height: 120,
                borderRadius: 12,
              }}
              source={{ uri: `https://picsum.photos/id/${goal.id}/300/300` }}
            />
            <Text
              style={{
                position: "absolute",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                left: 20,
                top: 20,
                zIndex: 2,
                textTransform: "uppercase",
              }}
            >
              {goal.name}
            </Text>
            <Text
              style={{
                position: "absolute",
                color: textColors[goal.status as keyof typeof textColors].color,
                fontSize: 12,
                fontWeight: "bold",
                left: 20,
                top: "40%",
                zIndex: 2,
              }}
            >
              {textColors[goal.status as keyof typeof textColors].text}
            </Text>
            <View style={{
              position: "absolute", left: 15,
              top: "50%",
              zIndex: 2,
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <PieChart
                donut
                radius={20}
                innerRadius={13}
                data={[
                  { value: percent, color: textColors[goal.status as keyof typeof textColors].color },
                  { value: 100 - percent, color: 'lightgray' }
                ]}
                textColor="transparent"
                centerLabelComponent={() => <Text style={{ fontSize: 8, fontWeight: "500" }} >{percent}%</Text>}
              />
            </View>
            <Ionicons
              name="caret-forward"
              size={30}
              color="white"
              style={{
                position: "absolute",
                bottom: "50%",
                right: 15,
                transform: [{ translateY: 15 }],
                zIndex: 2,
              }}
            />
          </TouchableOpacity>
        })
      )}
    </View>
  );
}
