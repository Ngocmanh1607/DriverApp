import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadUserImage } from '../utils/firebaseUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Snackbar from 'react-native-snackbar';
import { updateDriver, updateLicenseDriver } from '../api/driverApi';
import TextInputOutlined from '../../node_modules/react-native-paper/lib/module/components/TextInput/TextInputOutlined';
const RegisterInf = () => {
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
    const [isLoading, setIsLoading] = useState(false);
    const [imageUri, setImageUri] = useState(userInfo.image);

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
    // Validate định dạng số điện thoại (ví dụ: Việt Nam)
    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^(\+84|0)\d{9}$/; // Ví dụ: +84 hoặc 0 theo sau là 9 số
        return phoneRegex.test(phoneNumber);
    };

    // Validate ngày tháng năm sinh
    const validateDate = (date) => {
        const dateRegex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/; // Định dạng ngày: dd-mm-yyyy
        return dateRegex.test(date);
    };
    const handleSaveChanges = async () => {
        // 1. Kiểm tra tính hợp lệ của dữ liệu người dùng
        if (!userInfo.name || userInfo.name.trim() === '') {
            Alert.alert('Lỗi', 'Tên người dùng không được để trống.');
            return;
        }

        if (!userInfo.phone_number || !validatePhoneNumber(userInfo.phone_number)) {
            Alert.alert('Lỗi', 'Số điện thoại không hợp lệ.');
            return;
        }
        // if (!userInfo.date || !validateDate(userInfo.date)) {
        //     Alert.alert('Lỗi', 'Ngày sinh không hợp lệ. Vui lòng nhập đúng định dạng.');
        //     return;
        // }

        // 2. Kiểm tra thông tin xe
        if (!bike.license_plate || bike.license_plate.trim() === '') {
            Alert.alert('Lỗi', 'Biển số xe không được để trống.');
            return;
        }

        if (!bike.name || bike.name.trim() === '') {
            Alert.alert('Lỗi', 'Tên xe không được để trống.');
            return;
        }

        // 3. Kiểm tra nếu có ảnh
        if (!imageUri) {
            Alert.alert('Lỗi', 'Vui lòng chọn ảnh đại diện.');
            return;
        }

        // Thông báo xác nhận trước khi đăng ký
        Alert.alert(
            'Xác nhận đăng ký',
            'Bạn có chắc chắn muốn lưu thông tin này?',
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Hủy đăng ký'),
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            const url = await uploadFirebase(imageUri);
                            if (!url) {
                                Alert.alert("Lỗi", "Không thể tải ảnh lên. Vui lòng thử lại.");
                                return;
                            }

                            // Lưu thông tin người dùng và xe
                            const profile = {
                                ...userInfo,
                                image: url,
                            };
                            const response = await updateDriver(profile);
                            await updateLicenseDriver(bike);

                            if (response) {
                                Snackbar.show({
                                    text: 'Thông tin của bạn đã được cập nhật.',
                                    duration: Snackbar.LENGTH_SHORT,
                                });
                                navigation.navigate('MainDrawer');
                            }
                        } catch (error) {
                            console.error('Error updating profile:', error);
                            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
                        } finally {
                            setIsLoading(false);
                        }
                    }
                }
            ]
        );
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
                            <TextInput
                                mode='outlined'
                                label={'Tên'}
                                style={styles.input}
                                value={userInfo.name}
                                onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
                            />
                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label={'Số điện thoại'}
                                value={userInfo.phone_number.toString()}
                                onChangeText={(text) => setUserInfo({ ...userInfo, phone_number: text })}
                            />
                            <TextInput
                                placeholder='dd-mm-yyyy'
                                style={styles.input}
                                mode='outlined'
                                label={'Ngày-tháng-năm sinh'}
                                value={userInfo.date}
                                onChangeText={(text) => setUserInfo({ ...userInfo, date: text })}
                            />
                            <TextInput
                                style={styles.input}
                                value={bike.name}
                                mode='outlined'
                                label={'Tên loại xe'}
                                onChangeText={(text) => setBike({ ...bike, name: text })}
                            />
                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label={'Biển số xe'}
                                value={bike.license_plate}
                                onChangeText={(text) => setBike({ ...bike, license_plate: text })}
                            />

                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                                <Text style={styles.buttonText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )
            }
        </View>
    );
};


export default RegisterInf;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    avatarContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 5,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    infoContainer: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    input: {
        backgroundColor: '#FFF',
        fontSize: 16,
        marginBottom: 15,
    },
    buttonContainer: {
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#f00',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});