import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet, TextInput } from 'react-native'

import React from 'react'
import { ThemedText } from './ThemedText'
import Button from './Button'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function PersonInfoInput({ setInitInfo }: any) {
    const [info, setInfo] = React.useState({
        weigth: 0,
        heigth: 0,
        age: 0,
        oldWiegth: 0,
        nickname: ""
    })
    const onPress = () => {
        AsyncStorage.setItem("PERSON", JSON.stringify(info))
        setInitInfo(true)
    }
    return (

        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={{ width: 200, height: 200 }} resizeMode="contain" source={require("../assets/images/person.png")} />
                    <ThemedText style={{ textAlign: "center", marginBottom: 30 }} type="title" >Trạng thái của bạn bây giờ như thế nào?</ThemedText>
                    <View style={styles.inputContainer}>
                        <ThemedText type="defaultSemiBold">Nick Name</ThemedText>
                        <TextInput
                            style={styles.input}
                            placeholder="Tôi 60kg"
                            onChangeText={(text) => setInfo({ ...info, nickname: text })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <ThemedText type="defaultSemiBold">Cân năng hiện tại</ThemedText>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            placeholder="60kg"
                            onChangeText={(text) => setInfo({ ...info, weigth: Number(text) })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <ThemedText type="defaultSemiBold">Chiều cao</ThemedText>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            placeholder="180 cm"
                            onChangeText={(text) => setInfo({ ...info, heigth: Number(text) })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <ThemedText type="defaultSemiBold">Tuổi</ThemedText>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            placeholder="16"
                            onChangeText={(text) => setInfo({ ...info, age: Number(text) })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Button onPress={onPress} />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 6,
        // backgroundColor:'black'
    },
    inputContainer: { width: "90%", paddingHorizontal: 12, gap: 8 },
    input: {
        width: "100%",
        backgroundColor: "white",
        padding: 12,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 0.5,
    },
})