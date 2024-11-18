
import { launchImageLibrary } from "react-native-image-picker"
import { uploadRestaurantImage } from "./firebaseUtils";
import Snackbar from "react-native-snackbar";
const selectImage = () => {
    return new Promise((resolve, reject) => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                Snackbar.show({
                    text: 'Bạn đã hủy chọn ảnh',
                    duration: Snackbar.LENGTH_SHORT
                });
                resolve(null);
            } else if (response.error) {
                Snackbar.show({
                    text: 'Lỗi chọn ảnh',
                    duration: Snackbar.LENGTH_SHORT
                });
                reject(new Error('Lỗi chọn ảnh'));
            } else {
                const selectedImage = response.assets[0].uri;
                resolve(selectedImage)
            }
        });
    });
};
const uploadImage = async (userId, image) => {
    try {
        if (image && userId) {
            const url = await uploadRestaurantImage(userId, image);
            Snackbar.show({
                text: 'Ảnh đã được cập nhật!',
                duration: Snackbar.LENGTH_SHORT,
            });
            return url;
        } else {
            Snackbar.show({
                text: 'Không có ảnh nào được chọn hoặc thiếu userId',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    } catch (error) {
        return error
    }
};
const formatTime = (dateStr) => {
    const date = new Date(dateStr);

    const formattedTime = date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    return formattedTime
}
export { selectImage, uploadImage, formatTime }