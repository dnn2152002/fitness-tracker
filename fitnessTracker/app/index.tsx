import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SelectRole() {
    const router = useRouter();

    const handleRoleSelection = (role: 'user' | 'coach') => {
        // Here you can add logic to save the selected role
        // For now, we'll just navigate based on the selection
        if (role === 'user') {
            router.replace('/(tabs)');
        } else {
            router.replace('/(coach)');
        }
      
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chọn vai trò của bạn</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleRoleSelection('user')}
            >
                <Ionicons name="person-outline" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleRoleSelection('coach')}
            >
                <Ionicons name="fitness-outline" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Coach</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'black',
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});
