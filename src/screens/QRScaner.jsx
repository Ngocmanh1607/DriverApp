import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

const QRScanner = () => {
    const [cccdData, setCccdData] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);
    const device = useCameraDevice('back');

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
                try {
                    const parsedData = parseCCCDData(scannedData);
                    setCccdData(parsedData);
                } catch (error) {
                    console.log(error.message);
                    setCccdData({ error: 'Không thể đọc dữ liệu CCCD: ' + error.message });
                }
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

    if (!device) return <Text>Không tìm thấy camera</Text>;

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                device={device}
                isActive={true}
                codeScanner={onScanQRCode}
                enableZoomGesture={true}
            />
            {cccdData && (
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>Thông tin CCCD:</Text>
                    <Text>{JSON.stringify(cccdData, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

// Hàm tách dữ liệu từ QR CCCD
const parseCCCDData = (data) => {
    const parts = data.split('|');
    if (parts.length < 6) return { error: 'Dữ liệu CCCD không hợp lệ' };

    return {
        id: parts[0],
        cccdNumber: parts[1],
        fullName: parts[2],
        dob: parts[3],
        gender: parts[4],
        address: parts.slice(5).join(', ')
    };
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    camera: { width: '100%', height: 400 },
    infoBox: { marginTop: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
    infoText: { fontWeight: 'bold', fontSize: 16 },
});

export default QRScanner;