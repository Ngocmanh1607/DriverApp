import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadUserImage} from '../utils/firebaseUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import {updateDriver, updateLicenseDriver, getInfoUser} from '../api/driverApi';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../assets/css/ProfileStyle';
import {formatDate} from '../utils/format';

const Profile = ({route}) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();
  const [info, setInfo] = useState({
    id: '',
    image: '',
    fullName: '',
    dob: '',
    phone_number: '',
    cccdFront: '',
    cccdBack: '',
    license_plate: '',
    car_name: '',
    cavet: '',
  });
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route.params?.scannedInfo) {
      setInfo(route.params.scannedInfo);
    }
  }, [route.params?.scannedInfo]);

  const fetchInfoUser = async () => {
    try {
      const response = await getInfoUser();
      console.log('response', response);
      setInfo({
        id: response.Driver.cic,
        image: response.image,
        fullName: response.name,
        dob: response.Driver.dob,
        phone_number: response.phone_number,
        cccdFront: response.Driver.cccdFront,
        cccdBack: response.Driver.cccdBack,
        license_plate: response.Driver.license_plate,
        car_name: response.Driver.car_name,
        cavet: response.Driver.cavet,
      });
      setImage(response.image);
    } catch (error) {
      Alert.alert(
        'Lỗi',
        'Không thể lấy thông tin người dùng. Vui lòng thử lại sau',
      );
    }
  };

  useEffect(() => {
    fetchInfoUser();
  }, []);

  const openImagePicker = async type => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
    };

    try {
      const res = await launchImageLibrary(options);
      if (res.assets && res.assets.length > 0) {
        const imageUri = res.assets[0].uri;
        switch (type) {
          case 'avatar':
            setImage(imageUri);
            break;
          case 'cccdFront':
            setInfo(prev => ({...prev, cccdFront: imageUri}));
            break;
          case 'cccdBack':
            setInfo(prev => ({...prev, cccdBack: imageUri}));
            break;
          case 'cavet':
            setInfo(prev => ({...prev, cavet: imageUri}));
            break;
          default:
            break;
        }
      }
    } catch (error) {
      Snackbar.show({
        text: 'Không thể chọn ảnh. Vui lòng thử lại',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#e74c3c',
      });
    }
  };

  const uploadImage = async (image, imageType) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const imageUrl = await uploadUserImage(userId, image, imageType);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  // Validate định dạng số điện thoại (ví dụ: Việt Nam)
  const validatePhoneNumber = phoneNumber => {
    const phoneRegex = /^(\+84|0)\d{9}$/; // Ví dụ: +84 hoặc 0 theo sau là 9 số
    return phoneRegex.test(phoneNumber);
  };

  const toggleEditMode = async () => {
    if (isEditing) {
      // Kiểm tra thông tin xe
      if (!info.car_name || !info.cavet) {
        Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin xe');
        return;
      }
      // Kiểm tra định dạng số điện thoại
      if (!validatePhoneNumber(info.phone_number)) {
        Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
        return;
      }

      Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn lưu thay đổi?', [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Lưu',
          onPress: async () => {
            try {
              const profile = {...info};
              setIsLoading(true);
              if (image !== info.image) {
                const url = await uploadImage(image, 'avatar');
                if (!url) {
                  Alert.alert(
                    'Lỗi',
                    'Không thể tải ảnh lên. Vui lòng thử lại.',
                  );
                  return;
                }
                profile.image = url;
              }
              const response = await updateDriver(profile);
              if (response) {
                Snackbar.show({
                  text: 'Thông tin của bạn đã được cập nhật.',
                  duration: Snackbar.LENGTH_SHORT,
                });
              }
            } catch (error) {
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

  const handleCancel = () => {
    setIsEditing(!isEditing);
    fetchInfoUser();
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FF0000" />
        </View>
      ) : (
        <View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.avatarContainer}>
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => openImagePicker('avatar')}
                  disabled={!isEditing}>
                  {image ? (
                    <Image source={{uri: image}} style={styles.profileImage} />
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.label, {marginTop: 50}]}>
                    Thông tin cá nhân
                  </Text>
                  {isEditing && (
                    <TouchableOpacity
                      style={styles.scanButton}
                      onPress={() => navigation.navigate('QRScanner')}
                      disabled={!isEditing}>
                      <Text style={[styles.input, {color: '#FF0000'}]}>
                        Quét mã QR để lấy thông tin
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <TextInput
                  label="Số CCCD"
                  mode="outlined"
                  placeholder="VD: 123456789012"
                  activeOutlineColor={isEditing ? '#e74c3c' : '#666'}
                  outlineColor="#666"
                  editable={isEditing}
                  value={info.id || ''}
                  style={styles.input}
                  onChangeText={text => setInfo({...info, id: text})}
                />
                <TextInput
                  label="Họ và tên"
                  mode="outlined"
                  placeholder="VD: Nguyễn Văn A"
                  activeOutlineColor={isEditing ? '#e74c3c' : '#666'}
                  outlineColor="#666"
                  editable={isEditing}
                  value={info.fullName || ''}
                  style={styles.input}
                  onChangeText={text => setInfo({...info, fullName: text})}
                />
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}> */}
                {/* <TextInput
                    label="Ngày sinh"
                    mode="outlined"
                    activeOutlineColor={isEditing ? '#e74c3c' : '#666'}
                    outlineColor="#666"
                    editable={isEditing}
                    placeholder="VD: 1990-12-31"
                    value={isEditing ? info.dob : formatDate(info.dob) || ''}
                    style={[styles.input, {width: '45%'}]}
                    onChangeText={text => setInfo({...info, dob: text})}
                  /> */}
                <TextInput
                  label="Số điện thoại"
                  mode="outlined"
                  activeOutlineColor={isEditing ? '#e74c3c' : '#666'}
                  outlineColor="#666"
                  editable={isEditing}
                  placeholder="VD: 0909090909"
                  value={info.phone_number.toString() || ''}
                  style={styles.input}
                  onChangeText={text => setInfo({...info, phone_number: text})}
                />
                {/* </View> */}
                <Text style={styles.label}>Ảnh CCCD</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  }}>
                  <TouchableOpacity
                    style={styles.cccdImageContainer}
                    onPress={() => openImagePicker('cccdFront')}
                    disabled={!isEditing}>
                    {info.cccdFront ? (
                      <Image
                        source={{uri: info.cccdFront}}
                        style={styles.cccdImage}
                      />
                    ) : (
                      <View style={styles.cccdPlaceholder}>
                        <FontAwesome name="camera" size={24} color="#666" />
                        <Text style={{color: '#666', marginTop: 8}}>
                          Mặt trước CCCD
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cccdImageContainer}
                    onPress={() => openImagePicker('cccdBack')}
                    disabled={!isEditing}>
                    {info.cccdBack ? (
                      <Image
                        source={{uri: info.cccdBack}}
                        style={styles.cccdImage}
                      />
                    ) : (
                      <View style={styles.cccdPlaceholder}>
                        <FontAwesome name="camera" size={24} color="#666" />
                        <Text style={{color: '#666', marginTop: 8}}>
                          Mặt sau CCCD
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.vehicleInfo}>
                <Text style={styles.label}>Thông tin phương tiện</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    label="Biển số xe"
                    mode="outlined"
                    activeOutlineColor={isEditing ? '#e74c3c' : '#666'}
                    outlineColor="#666"
                    editable={isEditing}
                    placeholder="VD: 59A1-123.45"
                    value={info.license_plate || ''}
                    style={[styles.input, {width: '45%'}]}
                    onChangeText={text =>
                      setInfo({...info, license_plate: text})
                    }
                  />
                  <TextInput
                    label="Tên xe"
                    mode="outlined"
                    activeOutlineColor={isEditing ? '#e74c3c' : '#666'}
                    outlineColor="#666"
                    editable={isEditing}
                    value={info.car_name || ''}
                    style={[styles.input, {width: '45%'}]}
                    placeholder="VD: Honda Wave, Yamaha Sirius..."
                    onChangeText={text => setInfo({...info, car_name: text})}
                  />
                </View>
                <View style={styles.imageUploadContainer}>
                  <Text style={styles.label}>Hình ảnh đăng ký xe (Cà vẹt)</Text>
                  <TouchableOpacity
                    style={[styles.cccdImageContainer, {alignSelf: 'center'}]}
                    onPress={() => openImagePicker('cavet')}
                    disabled={!isEditing}>
                    {info.cavet ? (
                      <Image
                        source={{uri: info.cavet}}
                        style={styles.cccdImage}
                      />
                    ) : (
                      <View style={styles.cccdPlaceholder}>
                        <FontAwesome name="camera" size={24} color="#666" />
                        <Text style={{color: '#666', marginTop: 8}}>
                          Hình ảnh cà vẹt xe
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
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
        </View>
      )}
    </View>
  );
};

export default Profile;
