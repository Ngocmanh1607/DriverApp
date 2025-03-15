const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Quyền truy cập vị trí',
                message: 'Ứng dụng này cần quyền truy cập vị trí của bạn.',
                buttonNeutral: 'Hỏi lại sau',
                buttonNegative: 'Hủy',
                buttonPositive: 'Đồng ý',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
        const status = await Geolocation.requestAuthorization('whenInUse');
        return status === 'granted';
    }
};

export { requestLocationPermission };