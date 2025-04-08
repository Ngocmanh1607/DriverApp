import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import styles from '../assets/css/ConfirmEmailStyle';
import {useNavigation} from '@react-navigation/native';
const ConfirmEmailScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require('../assets/Images/background2.png')}
          style={styles.topImage}
        />
      </View>
      <Text style={styles.title}>Xác nhận Email</Text>
      <Text style={styles.message}>
        Bạn cần xác nhận email để làm bước tiếp theo. Vui lòng kiểm tra hộp thư
        của bạn.
      </Text>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Auth')}>
        <Text style={styles.linkText}>Tôi đã xác nhận, đăng nhập ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmEmailScreen;
