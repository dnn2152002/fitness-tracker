import { Image, Text, View, TouchableOpacity } from "react-native";
import fitness from "../data/fitness.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type FitnessCardsProps = {
  isDisabled: boolean;
  excerises: string;
  planId: number;
};
const FitnessCards = ({
  excerises,
  isDisabled = false,
  planId,
}: FitnessCardsProps) => {
  const FitnessData = fitness;
  const navigation: any = useNavigation();
  return (
    // <View style={{ marginTop: 80, marginHorizontal: 20, marginBottom: 20 }}>
    <View style={{ marginTop: 0, marginHorizontal: 0, marginBottom: 12 }}>
      {FitnessData.filter((f) => excerises.includes(f.name)).map((item, id) => (
        <TouchableOpacity
          disabled={isDisabled}
          onPress={() =>
            navigation.navigate("workouts", {
              image: item.image,
              exercises: item.exercises,
              id: item.id,
              planId,
            })
          }
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
          key={id}
        >
          {isDisabled && (
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
          )}
          <Image
            style={{ width: "100%", height: 120, borderRadius: 12 }}
            source={{ uri: item.image }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              left: 20,
              top: 20,
            }}
          >
            {item.name}
          </Text>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={30}
            color="#dfbe04"
            style={{ position: "absolute", bottom: 15, left: 15 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FitnessCards;
