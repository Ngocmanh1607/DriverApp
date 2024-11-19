import messaging from '@react-native-firebase/messaging';
const fetchFcmToken = async () => {
    const authStatus = await messaging().requestPermission();
    const permissionGranted =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!permissionGranted) {
        console.log('Notification permission denied.');
        return null;
    }

    console.log('Notification permission granted.');

    try {
        // Đảm bảo đăng ký thiết bị
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        if (token) {
            console.log('FCM Token:', token);
            return token;
        } else {
            console.log('Failed to get FCM token');
            return null;
        }
    } catch (error) {
        console.error('Error fetching FCM token:', error);
        return null;
    }
};
export default fetchFcmToken;