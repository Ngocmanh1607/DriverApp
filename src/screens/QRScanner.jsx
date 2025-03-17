import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

const QRScanner = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const device = useCameraDevice('back');
    const navigation = useNavigation();

    // Hàm kiểm tra & yêu cầu quyền camera
    const requestCameraPermission = async () => {
        const permission = await Camera.requestCameraPermission();
        if (permission === 'granted') {
            setHasPermission(true);
        } else {
            Alert.alert("Quyền bị từ chối", "Bạn cần cấp quyền camera để sử dụng tính năng này.");
        }
    };

    const parseCCCDData = (info) => {
        const parts = info.split('|');
        if (parts.length < 7) return { error: 'Dữ liệu CCCD không hợp lệ' };

        return {
            id: parts[0],
            fullName: parts[2],
            dob: parts[3].slice(0, 2) + '-' + parts[3].slice(2, 4) + '-' + parts[3].slice(4),
            gender: parts[4],
            address: parts.slice(5, -1).join(', '),
            date: parts[parts.length - 1]
        };
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const onScanQRCode = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes) => {
            if (codes.length > 0) {
                const scannedData = codes[0].value;
                const parsedData = parseCCCDData(scannedData);
                navigation.navigate('Đăng kí thông tin', { scannedInfo: parsedData });
            }
        },
    });

    if (!hasPermission) {
        return (
            <View style={styles.permissionContainer}>
                <Text>Ứng dụng cần quyền truy cập camera</Text>
                <Button title="Cấp quyền" onPress={requestCameraPermission} />
            </View>
        );
    }

    if (!device) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Không tìm thấy camera</Text>
            </View>);
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                device={device}
                isActive={true}
                codeScanner={onScanQRCode}
                enableZoomGesture={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    permissionContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    camera: {
        width: '100%',
        height: '100%',
        borderRadius: 12
    },
    infoBox: {
        marginTop: 24,
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    infoText: {
        fontWeight: '700',
        fontSize: 16,
        color: '#212529'
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#495057',
        textAlign: 'center'
    }
});

export default QRScanner;