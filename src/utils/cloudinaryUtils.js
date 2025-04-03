import axios from 'axios';
import {cloudinaryConfig} from './cloudinaryConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const uploadImageToCloudinary = async (imageUri, name) => {
  const userId = await AsyncStorage.getItem('userId');
  const formData = new FormData();

  // Lấy tên file từ đường dẫn
  const fileName = imageUri.split('/').pop();
  console.log(fileName);
  // Đoán loại MIME từ đuôi file
  const match = /\.(\w+)$/.exec(fileName);
  const type = match ? `image/${match[1]}` : 'image';

  formData.append('file', {
    uri: imageUri,
    name: name,
    type: type,
  });
  // formData.append('overwrite', true);

  formData.append('upload_preset', cloudinaryConfig.uploadPreset);

  if (userId) {
    formData.append('folder', userId);
    formData.append('create_folder', true);
  }
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('Đường dẫn ảnh:', response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    console.error('Lỗi khi tải lên Cloudinary:', error);
    throw error;
  }
};
