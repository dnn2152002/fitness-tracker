import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Define the User type
type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
};

// Assuming we have a function to fetch users from the database
// This should be replaced with actual implementation
const fetchUsers = async (): Promise<User[]> => {
    // Placeholder: Replace with actual API call or database query
    return [
        { id: '1', name: 'John Doe', email: 'john@example.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
        // ... more users
    ];
};

export default function CoachDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        const loadUsers = async () => {
            const fetchedUsers = await fetchUsers();
            setUsers(fetchedUsers);
        };
        loadUsers();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={() => router.push('/add-ads')} style={styles.headerButton}>
                        <Ionicons name="megaphone-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, router]);

    const renderUserItem = ({ item }: { item: User }) => (
        <TouchableOpacity onPress={() => router.push('/(coach)/detail-user')} style={styles.userItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#007AFF" />
        </TouchableOpacity>
    );

    return (
        <LinearGradient colors={['#f0f0f0', '#ffffff']} style={styles.container}>
            <Text style={styles.title}>Coach Dashboard</Text>
            <Text style={styles.subtitle}>Manage Your Users</Text>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id}
                style={styles.userList}
                contentContainerStyle={styles.listContent}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        color: '#666',
    },
    headerButtons: {
        flexDirection: 'row',
    },
    headerButton: {
        marginRight: 15,
    },
    userList: {
        flex: 1,
    },
    listContent: {
        paddingVertical: 8,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
});