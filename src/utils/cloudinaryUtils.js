import axios from 'axios';

// Thay thế bằng Cloudinary URL và upload preset của bạn
const CLOUDINARY_URL = 'CLOUDINARY_URL=cloudinary://873868239175211:FDuKWC9biNoFknIKSbcSxlQqMss@dt6hoe0sh';
const UPLOAD_PRESET = 'Driver';

/**
 * Upload ảnh lên Cloudinary
 * @param {string} imageUri - URI của ảnh cần upload
 * @param {string} folder - Thư mục lưu trữ trên Cloudinary (tùy chọn)
 * @returns {Promise<string>} URL của ảnh sau khi upload
 */
export const uploadToCloudinary = async (imageUri, folder = '') => {
    try {
        // Tạo form data
        const formData = new FormData();
        formData.append('file', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'upload.jpg'
        });
        formData.append('upload_preset', UPLOAD_PRESET);
        if (folder) {
            formData.append('folder', folder);
        }

        // Upload ảnh lên Cloudinary
        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Trả về URL của ảnh
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Không thể tải ảnh lên. Vui lòng thử lại.');
    }
};

/**
 * Upload nhiều ảnh lên Cloudinary
 * @param {string[]} imageUris - Mảng các URI của ảnh cần upload
 * @param {string} folder - Thư mục lưu trữ trên Cloudinary (tùy chọn)
 * @returns {Promise<string[]>} Mảng các URL của ảnh sau khi upload
 */
export const uploadMultipleToCloudinary = async (imageUris, folder = '') => {
    try {
        const uploadPromises = imageUris.map(uri => uploadToCloudinary(uri, folder));
        const urls = await Promise.all(uploadPromises);
        return urls;
    } catch (error) {
        console.error('Error uploading multiple images to Cloudinary:', error);
        throw new Error('Không thể tải ảnh lên. Vui lòng thử lại.');
    }
}; 