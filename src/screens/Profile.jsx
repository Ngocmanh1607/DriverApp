import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadUserImage } from '../utils/firebaseUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Snackbar from 'react-native-snackbar';
import { getInfoUser, updateDriver, updateLicenseDriver } from '../api/driverApi';
const Profile = () => {
    const navigation = useNavigation();
    const [isEditting, setIsEditting] = useState(false)
    const [userInfo, setUserInfo] = useState({
        name: '',
        image: '',
        date: '',
        phone_number: '',
    });
    const [bike, setBike] = useState({
        license_plate: '',
        name: ''
    })
    useEffect(() => {
        const fetchInfoUser = async () => {
            const response = await getInfoUser();
            setUserInfo({
                name: response.name,
                image: response.image,
                phone_number: response.phone_number,
                date: response.date.split('T')[0],
            })
            setImageUri(response.image)
            setBike({
                license_plate: response.Driver.license_plate,
                name: response.Driver.car_name,
            })
            console.log(response)
        }
        fetchInfoUser();
    }, [])
    const [isLoading, setIsLoading] = useState(false);
    const [imageUri, setImageUri] = useState();

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
        };
        launchImageLibrary(options, (res) => {
            if (res.assets && res.assets.length > 0) {
                setImageUri(res.assets[0].uri);
            }
        });
    };

    const uploadFirebase = async (image) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const imageUrl = await uploadUserImage(userId, image);
            return imageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleSaveChanges = async () => {
        if (isEditting) {
            try {
                const profile = userInfo;
                setIsLoading(true);
                console.log(imageUri, userInfo.image)
                if (imageUri != userInfo.image) {
                    const url = await uploadFirebase(imageUri);
                    if (!url) {
                        Alert.alert("Lỗi", "Không thể tải ảnh lên. Vui lòng thử lại.");
                        return;
                    }
                    profile = {
                        ...userInfo,
                        image: url,
                    };
                }
                const response = await updateDriver(profile);
                await updateLicenseDriver(bike)
                if (response) {
                    Snackbar.show({
                        text: 'Thông tin của bạn đã được cập nhật.',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                    navigation.navigate('MainDrawer')
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
            } finally {
                setIsLoading(false);
                setIsEditting(false)
            }
        }
        else {
            setIsEditting(true)
        }
    };

    return (
        <View style={styles.container}>
            {
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' color='#FF0000' />
                    </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.avatarContainer}>
                            <TouchableOpacity style={styles.imageContainer} onPress={openImagePicker}>
                                {imageUri ? (
                                    <Image source={{ uri: imageUri }} style={styles.profileImage} />
                                ) : (<FontAwesome name="user" size={60} color="black" style={{ paddingVertical: 6 }} />)}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Tên:</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.name}
                                editable={isEditting}
                                onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
                            />
                            <Text style={styles.label}>Số điện thoại:</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.phone_number.toString()}
                                editable={isEditting}
                                onChangeText={(text) => setUserInfo({ ...userInfo, phone_number: text })}
                            />
                            <Text style={styles.label}>Năm sinh:</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.date}
                                editable={isEditting}
                                onChangeText={(text) => setUserInfo({ ...userInfo, date: text })}
                            />
                            <Text style={styles.label}>Hiệu xe:</Text>
                            <TextInput
                                style={styles.input}
                                editable={isEditting}
                                value={bike.name}
                                onChangeText={(text) => setBike({ ...bike, name: text })}
                            />
                            <Text style={styles.label}>Biển số xe: </Text>
                            <TextInput
                                style={styles.input}
                                editable={isEditting}
                                value={bike.license_plate}
                                onChangeText={(text) => setBike({ ...bike, license_plate: text })}
                            />

                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.saveButton, { backgroundColor: isEditting ? '#33CC66' : '#FF0000' }]} onPress={handleSaveChanges}>
                                <Text style={styles.buttonText}>{isEditting ? 'Lưu' : 'Chỉnh sửa'}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )
            }
        </View>
    );
};


export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        backgroundColor: '#FF6347',
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    avatarContainer: {
        backgroundColor: '#FFF',
        width: 120,
        height: 120,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#FF0000',
        elevation: 5
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: '#FF6347',
        borderWidth: 2,
    },
    editAvatar: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        backgroundColor: '#FF0000',
        padding: 5,
        borderRadius: 15,
    },
    infoContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    saveButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});