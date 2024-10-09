import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Video, ResizeMode } from 'expo-av';

export default function AddAds() {
    const [activeTab, setActiveTab] = useState('tutorial');
    const [tutorial, setTutorial] = useState('');
    const [videoUri, setVideoUri] = useState('');
    const [videoThumbnail, setVideoThumbnail] = useState('');
    const [ptName, setPtName] = useState('');
    const [ptAvatar, setPtAvatar] = useState('');
    const [ptDescription, setPtDescription] = useState('');
    const [ptPricing, setPtPricing] = useState('');
    const [adName, setAdName] = useState('');
    const [adBannerUrl, setAdBannerUrl] = useState('');
    const [adLink, setAdLink] = useState('');
    const [externalVideoUrl, setExternalVideoUrl] = useState('');

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setVideoUri(result.assets[0].uri);
            generateThumbnail(result.assets[0].uri);
        }
    };

    const generateThumbnail = async (videoUri:string) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                videoUri,
                {
                    time: 0,
                }
            );
            setVideoThumbnail(uri);
        } catch (e) {
            console.warn(e);
        }
    };

    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setPtAvatar(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        // Here you would typically send the data to your backend
        console.log({ tutorial, videoUri, externalVideoUrl, ptName, ptAvatar, ptDescription, ptPricing, adName, adBannerUrl, adLink });
        // Reset form or navigate away
    };

    const renderTutorialTab = () => (
        <View>
            <Text style={styles.label}>Write Tutorial</Text>
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={8}
                onChangeText={setTutorial}
                value={tutorial}
                placeholder="Enter your tutorial here..."
            />

            <Text style={styles.label}>Upload Video</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickVideo}>
                <Ionicons name="cloud-upload-outline" size={24} color="white" />
                <Text style={styles.uploadButtonText}>Choose Video</Text>
            </TouchableOpacity>
            {videoUri ? (
                <View>
                    <Text style={styles.videoSelected}>Video selected</Text>
                    <Video
                        source={{ uri: videoUri }}
                        style={styles.videoPreview}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                    />
                </View>
            ) : null}

            <Text style={styles.label}>Or Enter External Video URL</Text>
            <TextInput
                style={styles.input}
                onChangeText={setExternalVideoUrl}
                value={externalVideoUrl}
                placeholder="Enter external video URL..."
            />
            {externalVideoUrl ? (
                <Video
                    source={{ uri: externalVideoUrl }}
                    style={styles.videoPreview}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                />
            ) : null}
        </View>
    );

    const renderPTPromotionTab = () => (
        <View>
            <Text style={styles.label}>PT Promotion</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPtName}
                value={ptName}
                placeholder="Enter PT name..."
            />
            <TouchableOpacity style={styles.uploadButton} onPress={pickAvatar}>
                <Ionicons name="person-circle-outline" size={24} color="white" />
                <Text style={styles.uploadButtonText}>Choose Avatar</Text>
            </TouchableOpacity>
            {ptAvatar ? (
                <Image source={{ uri: ptAvatar }} style={styles.avatar} />
            ) : null}
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                onChangeText={setPtDescription}
                value={ptDescription}
                placeholder="Enter PT description and experience..."
            />
            <TextInput
                style={styles.input}
                onChangeText={setPtPricing}
                value={ptPricing}
                placeholder="Enter PT pricing..."
                keyboardType="numeric"
            />
        </View>
    );

    const renderAppAdsTab = () => (
        <View>
            <Text style={styles.label}>App Advertisement</Text>
            <TextInput
                style={styles.input}
                onChangeText={setAdName}
                value={adName}
                placeholder="Enter ad name..."
            />
            <TextInput
                style={styles.input}
                onChangeText={setAdBannerUrl}
                value={adBannerUrl}
                placeholder="Enter banner URL..."
            />
            {adBannerUrl ? (
                <Image source={{ uri: adBannerUrl }} style={styles.bannerPreview} />
            ) : null}
            <TextInput
                style={styles.input}
                onChangeText={setAdLink}
                value={adLink}
                placeholder="Enter ad link..."
            />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add Content</Text>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'tutorial' && styles.activeTab]}
                    onPress={() => setActiveTab('tutorial')}
                >
                    <Text style={styles.tabText}>Tutorial</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'ptPromotion' && styles.activeTab]}
                    onPress={() => setActiveTab('ptPromotion')}
                >
                    <Text style={styles.tabText}>PT Promotion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'appAds' && styles.activeTab]}
                    onPress={() => setActiveTab('appAds')}
                >
                    <Text style={styles.tabText}>App Ads</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'tutorial' && renderTutorialTab()}
            {activeTab === 'ptPromotion' && renderPTPromotionTab()}
            {activeTab === 'appAds' && renderAppAdsTab()}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
    },
    activeTab: {
        borderBottomColor: '#007AFF',
    },
    tabText: {
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    uploadButton: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    uploadButtonText: {
        color: 'white',
        marginLeft: 10,
    },
    videoSelected: {
        color: 'green',
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 15,
    },
    thumbnail: {
        width: 200,
        height: 112,
        alignSelf: 'center',
        marginBottom: 15,
    },
    videoPreview: {
        width: '100%',
        height: 200,
        marginBottom: 15,
    },
    bannerPreview: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 15,
    },
});