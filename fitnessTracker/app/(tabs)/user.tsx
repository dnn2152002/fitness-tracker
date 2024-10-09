import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemedText } from '@/components/ThemedText'
import { LinearGradient } from 'expo-linear-gradient'
import Button from '@/components/Button'
import { useSQLiteContext } from 'expo-sqlite'
import * as Updates from 'expo-updates';


export default function user() {
    const db = useSQLiteContext();

    const [info, setInfo] = React.useState<any>({
        weigth: 0,
        heigth: 0,
        age: 0,
        nickname: ""
    })
    React.useEffect(() => {
        AsyncStorage.getItem("PERSON").then(res => {
            if (res) {
                setInfo(JSON.parse(res))
            }
        })
    }, [])
    const onClearData = async () => {
        await AsyncStorage.clear()
        await db.execAsync(`PRAGMA user_version = 0;`);
        await Updates.reloadAsync()
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", gap: 12 }}>
                    <Image style={{ width: 80, height: 100, borderRadius: 12 }} resizeMode="cover" source={{ uri: "https://img.freepik.com/free-photo/fit-cartoon-character-training_23-2151149055.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1723939200&semt=ais_hybrid" }} />
                    <View style={{ gap: 4 }}>
                        <ThemedText>Hello again</ThemedText>
                        <Text style={{ fontSize: 34 }}>{info.nickname}</Text>
                        <ThemedText>{info.age} tuổi</ThemedText>
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 24
                }}>
                    <Text style={{ fontSize: 18 }}>{new Date().toLocaleDateString()}</Text>
                    <Text style={{ fontSize: 256 }} >{info.weigth}</Text>
                    <Text style={{ fontSize: 34 }} >kg</Text>
                </View>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.background}
                />
                <Button onPress={onClearData} text='Xoá dữ liệu' />
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 6,
        height: "100%"
        // backgroundColor:'black'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 300,
    },
})