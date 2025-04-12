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
import {TextInput} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import {registerDriver} from '../api/driverApi';
import styles from '../assets/css/RegisterInfoStyle';
import {uploadImageToCloudinary} from '../utils/cloudinaryUtils';
const RegisterInf = ({route}) => {
  useEffect(() => {
    if (route.params?.scannedInfo) {
      setInfo(route.params.scannedInfo);
    }
  }, [route.params?.scannedInfo]);
  const navigation = useNavigation();
  const [info, setInfo] = useState({
    id: '',
    image: '',
    fullName: '',
    dob: '',
    gender: '',
    address: '',
    date: '',
    phone_number: '',
    cccdFront: '',
    cccdBack: '',
    license_plate: '',
    car_name: '',
    cavet: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState('');

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
            setInfo(prev => ({...prev, image: imageUri}));

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

  const uploadCloudinary = async (image, name) => {
    const imageUrl = await uploadImageToCloudinary(image, name);
    return imageUrl;
  };
  // Validate định dạng số điện thoại (ví dụ: Việt Nam)
  const validatePhoneNumber = phoneNumber => {
    const phoneRegex = /^(\+84|0)\d{9}$/; // Ví dụ: +84 hoặc 0 theo sau là 9 số
    return phoneRegex.test(phoneNumber);
  };

  // Validate ngày tháng năm sinh
  const validateDate = date => {
    const dateRegex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/; // Định dạng ngày: dd-mm-yyyy
    return dateRegex.test(date);
  };

  const handleSaveChanges = async () => {
    // Kiểm tra các trường bắt buộc
    // if (
    //   !info.fullName ||
    //   !info.phone_number ||
    //   !info.dob ||
    //   !info.address ||
    //   !info.cccdFront ||
    //   !info.cccdBack
    // ) {
    //   Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin cá nhân');
    //   return;
    // }
    // // Kiểm tra thông tin xe
    // if (!bike.name || !bike.cavet) {
    //   Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin xe');
    //   return;
    // }
    // // Kiểm tra định dạng số điện thoại
    // if (!validatePhoneNumber(info.phone_number)) {
    //   Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
    //   return;
    // }
    // // Kiểm tra định dạng ngày sinh
    // if (!validateDate(info.dob)) {
    //   Alert.alert(
    //     'Thông báo',
    //     'Ngày sinh không hợp lệ (định dạng: dd-mm-yyyy)',
    //   );
    //   return;
    // }
    // Thông báo xác nhận trước khi đăng ký
    Alert.alert(
      'Xác nhận đăng ký',
      'Bạn có chắc chắn muốn lưu thông tin này?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Hủy đăng ký'),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            try {
              setIsLoading(true);
              const url_name = await uploadCloudinary(info.image, 'avatar');
              const url_cccdFront = await uploadCloudinary(
                info.cccdFront,
                'cccdFront',
              );
              const url_cccdBack = await uploadCloudinary(
                info.cccdBack,
                'cccdBack',
              );
              const url_cavet = await uploadCloudinary(info.cavet, 'cavet');
              if (!url_name || !url_cccdFront || !url_cccdBack || !url_cavet) {
                Alert.alert('Lỗi', 'Không thể tải ảnh lên. Vui lòng thử lại.');
                return;
              }
              info.image = url_name;
              info.cccdFront = url_cccdFront;
              info.cccdBack = url_cccdBack;
              info.cavet = url_cavet;
              await registerDriver(info);
              Snackbar.show({
                text: 'Thông tin của bạn đã được cập nhật.',
                duration: Snackbar.LENGTH_SHORT,
              });
              navigation.navigate('MainDrawer');
            } catch (error) {
              console.log('Error:', error);
              Alert.alert(
                'Lỗi',
                'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.',
              );
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FF0000" />
        </View>
      ) : (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => openImagePicker('avatar')}>
                {info.image ? (
                  <Image
                    source={{uri: info.image}}
                    style={styles.profileImage}
                  />
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
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.label, {marginTop: 50}]}>
                  Thông tin cá nhân
                </Text>
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={() => navigation.navigate('QRScanner')}>
                  <Text style={[styles.input, {color: '#FF0000'}]}>
                    Quét mã QR để lấy thông tin
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                label="Số CCCD"
                mode="outlined"
                placeholder="VD: 123456789012"
                activeOutlineColor="#e74c3c"
                value={info.id || ''}
                style={styles.input}
                onChangeText={text => setInfo({...info, id: text})}
              />
              <TextInput
                label="Họ và tên"
                mode="outlined"
                placeholder="VD: Nguyễn Văn A"
                activeOutlineColor="#e74c3c"
                value={info.fullName || ''}
                style={styles.input}
                onChangeText={text => setInfo({...info, fullName: text})}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput
                  label="Ngày sinh"
                  mode="outlined"
                  activeOutlineColor="#e74c3c"
                  placeholder="VD: 12/12/1990"
                  value={info.dob || ''}
                  style={[styles.input, {width: '64%'}]}
                  onChangeText={text => setInfo({...info, dob: text})}
                />
                <TextInput
                  label="Giới tính"
                  placeholder="Nam/Nữ"
                  mode="outlined"
                  activeOutlineColor="#e74c3c"
                  value={info.gender || ''}
                  style={[styles.input, {width: '34%'}]}
                  onChangeText={text => setInfo({...info, gender: text})}
                />
              </View>
              <TextInput
                label="Số điện thoại"
                mode="outlined"
                activeOutlineColor="#e74c3c"
                placeholder="VD: 0909090909"
                value={info.phone_number || ''}
                style={styles.input}
                onChangeText={text => setInfo({...info, phone_number: text})}
              />
              <TextInput
                label="Địa chỉ"
                mode="outlined"
                activeOutlineColor="#e74c3c"
                value={info.address || ''}
                style={styles.input}
                numberOfLines={2}
                onChangeText={text => setInfo({...info, address: text})}
              />
              <Text style={styles.label}>Ảnh CCCD</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  style={styles.cccdImageContainer}
                  onPress={() => openImagePicker('cccdFront')}>
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
                  onPress={() => openImagePicker('cccdBack')}>
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
              <TextInput
                label="Biển số xe"
                mode="outlined"
                activeOutlineColor="#e74c3c"
                placeholder="VD: 59A1-123.45"
                value={info.license_plate || ''}
                style={styles.input}
                onChangeText={text => setInfo({...info, license_plate: text})}
              />
              <TextInput
                label="Tên xe"
                mode="outlined"
                activeOutlineColor="#e74c3c"
                value={info.car_name || ''}
                style={styles.input}
                placeholder="VD: Honda Wave, Yamaha Sirius..."
                onChangeText={text => setInfo({...info, car_name: text})}
              />
              <View style={styles.imageUploadContainer}>
                <Text style={styles.label}>Hình ảnh đăng ký xe (Cà vẹt)</Text>
                <TouchableOpacity
                  style={[styles.cccdImageContainer, {alignSelf: 'center'}]}
                  onPress={() => openImagePicker('cavet')}>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default RegisterInf;
