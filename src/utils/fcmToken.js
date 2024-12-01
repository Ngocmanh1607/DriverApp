import messaging from '@react-native-firebase/messaging';
import { Alert, Linking } from 'react-native';

const fetchFcmToken = async () => {
    try {
        // Yêu cầu quyền thông báo
        const authStatus = await messaging().requestPermission();
        const permissionGranted =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!permissionGranted) {
            console.log('Người dùng từ chối quyền thông báo.');

            // Hiển thị cảnh báo yêu cầu quyền
            Alert.alert(
                'Cấp quyền thông báo',
                'Ứng dụng này cần quyền thông báo để hoạt động đầy đủ. Vui lòng bật quyền trong cài đặt.',
                [
                    {
                        text: 'Đi đến Cài đặt',
                        onPress: () => Linking.openSettings(), // Điều hướng đến cài đặt
                    },
                    { text: 'Hủy', style: 'cancel' },
                ]
            );

            return null;
        }

        console.log('Người dùng đã cấp quyền thông báo.');

        // Lấy FCM token
        const token = await messaging().getToken();
        if (token) {
            console.log('Mã FCM:', token);
            return token;
        } else {
            console.log('Không thể lấy mã FCM');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy mã FCM:', error);
        return null;
    }
};

export default fetchFcmToken;