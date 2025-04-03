import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadUserImage} from '../utils/firebaseUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import {getInfoUser, updateDriver, updateLicenseDriver} from '../api/driverApi';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Profile = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    image: '',
    date: '',
    phone_number: '',
  });
  const [bike, setBike] = useState({
    license_plate: '',
    name: '',
  });
  useEffect(() => {
    const fetchInfoUser = async () => {
      const response = await getInfoUser();
      setUserInfo({
        name: response.name,
        image: response.image,
        phone_number: response.phone_number,
        date: response.date.split('T')[0],
      });
      setImageUri(response.image);
      setBike({
        license_plate: response.Driver.license_plate,
        name: response.Driver.car_name,
      });
      console.log(response);
    };
    fetchInfoUser();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState();

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, res => {
      if (res.assets && res.assets.length > 0) {
        setImageUri(res.assets[0].uri);
      }
    });
  };

  const uploadFirebase = async image => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const imageUrl = await uploadUserImage(userId, image);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const toggleEditMode = async () => {
    if (isEditing) {
      // Validate data
      if (!userInfo.name.trim()) {
        Alert.alert('Lỗi', 'Tên không được để trống.');
        return;
      }
      if (
        !userInfo.phone_number.trim() ||
        !/^\d{10}$/.test(userInfo.phone_number)
      ) {
        Alert.alert('Lỗi', 'Số điện thoại không hợp lệ.');
        return;
      }
      if (!bike.license_plate.trim()) {
        Alert.alert('Lỗi', 'Biển số xe không được để trống.');
        return;
      }
      if (!bike.name.trim()) {
        Alert.alert('Lỗi', 'Tên xe không được để trống.');
        return;
      }

      // Show confirmation dialog
      Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn lưu thay đổi?', [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Lưu',
          onPress: async () => {
            try {
              const profile = {...userInfo};
              setIsLoading(true);
              console.log(imageUri, userInfo.image);

              // Upload image if it has changed
              if (imageUri !== userInfo.image) {
                const url = await uploadFirebase(imageUri);
                if (!url) {
                  Alert.alert(
                    'Lỗi',
                    'Không thể tải ảnh lên. Vui lòng thử lại.',
                  );
                  return;
                }
                profile.image = url;
              }

              // Update profile and bike info
              const response = await updateDriver(profile);
              await updateLicenseDriver(bike);
              if (response) {
                Snackbar.show({
                  text: 'Thông tin của bạn đã được cập nhật.',
                  duration: Snackbar.LENGTH_SHORT,
                });
                navigation.navigate('MainDrawer');
              }
            } catch (error) {
              console.error('Error updating profile:', error);
              Alert.alert(
                'Lỗi',
                'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.',
              );
            } finally {
              setIsLoading(false);
              setIsEditing(false);
            }
          },
        },
      ]);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => setIsEditing(!isEditing);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FF0000" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={openImagePicker}>
              {imageUri ? (
                <Image source={{uri: imageUri}} style={styles.profileImage} />
              ) : (
                <FontAwesome
                  name="user"
                  size={60}
                  color="black"
                  style={{paddingVertical: 6}}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <TextInput
              label="Tên"
              mode="outlined"
              value={userInfo.name}
              disabled={!isEditing}
              onChangeText={text => setUserInfo({...userInfo, name: text})}
              style={styles.input}
              theme={{colors: {primary: '#FF0000'}}}
            />
            <TextInput
              label="Số điện thoại"
              mode="outlined"
              value={userInfo.phone_number.toString()}
              disabled={!isEditing}
              onChangeText={text =>
                setUserInfo({...userInfo, phone_number: text})
              }
              style={styles.input}
              theme={{colors: {primary: '#FF0000'}}}
              keyboardType="numeric"
            />
            <TextInput
              label="Năm sinh"
              mode="outlined"
              value={userInfo.date}
              disabled={!isEditing}
              onChangeText={text => setUserInfo({...userInfo, date: text})}
              style={styles.input}
              theme={{colors: {primary: '#FF0000'}}}
            />
            <TextInput
              label="Hiệu xe"
              mode="outlined"
              value={bike.name}
              disabled={!isEditing}
              onChangeText={text => setBike({...bike, name: text})}
              style={styles.input}
              theme={{colors: {primary: '#FF0000'}}}
            />
            <TextInput
              label="Biển số xe"
              mode="outlined"
              value={bike.license_plate}
              disabled={!isEditing}
              onChangeText={text => setBike({...bike, license_plate: text})}
              style={styles.input}
              theme={{colors: {primary: '#FF0000'}}}
            />
          </View>

          {isEditing ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={toggleEditMode}>
                <Text style={styles.buttonText}>Lưu</Text>
                <Icon
                  name="save"
                  size={18}
                  color="#fff"
                  style={styles.logoutIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}>
                <Text style={styles.buttonText}>Huỷ</Text>
                <Icon
                  name="times"
                  size={18}
                  color="#fff"
                  style={styles.logoutIcon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={toggleEditMode}>
                <Text style={styles.buttonText}>Chỉnh sửa</Text>
                <Icon
                  name="edit"
                  size={18}
                  color="#fff"
                  style={styles.logoutIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  avatarContainer: {
    backgroundColor: '#FFF',
    width: 150,
    height: 150,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 75,
    elevation: 5,
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
