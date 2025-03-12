import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
const QRScanner = () => {
    const [cccdData, setCccdData] = useState(null);
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

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const onScanQRCode = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes) => {
            if (codes.length > 0) {
                const scannedData = codes[0].value;
                navigation.navigate('Information', { cccdData: scannedData })
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    camera: {
        width: '100%',
        height: 400
    },
    infoBox: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8
    },
    infoText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333'
    }
});

export default QRScanner;