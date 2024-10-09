import { Stack } from "expo-router";

export default function CoachLayout() {
    return <Stack>
        <Stack.Screen name="index" options={{ title:"Fitness Coach" }} />
        <Stack.Screen name="add-ads" />
        <Stack.Screen name="detail-user" />
    </Stack>
}