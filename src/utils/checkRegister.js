import {Alert} from 'react-native';
import {getInfoUser} from '../api/driverApi';
export default async function checkRegister() {
  try {
    const response = await getInfoUser();
    return response ? true : false;
  } catch (error) {
    Alert.alert(
      'Lỗi',
      'Không thể lấy thông tin người dùng. Vui lòng thử lại sau',
    );
  }
}
