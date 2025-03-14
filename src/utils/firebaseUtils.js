
import storage from '@react-native-firebase/storage';

const uploadUserImage = async (driverId, imageUri, imageType) => {
    try {
        // Tạo đường dẫn lưu trữ trên Firebase Storage
        const storagePath = `drivers/${driverId}/${imageType}.jpg`;
        // Upload ảnh lên Firebase Storage
        const reference = storage().ref(storagePath);
        const task = reference.putFile(imageUri);
        // Theo dõi tiến trình tải lên (tuỳ chọn)
        task.on('state_changed', taskSnapshot => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
            );
        });
        await task;
        const downloadURL = await reference.getDownloadURL();
        console.log('Image URL:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
export { uploadUserImage };