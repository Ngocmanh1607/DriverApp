import React, {useEffect, useState} from 'react';
import {View, Switch, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getInfoUser, changeStatus} from '../api/driverApi';

const HeaderSwitch = () => {
  const [driverId, setDriverId] = useState(null);
  const [isReceivingOrders, setIsReceivingOrders] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDriverId = async () => {
      try {
        await getInfoUser();
        const id = await AsyncStorage.getItem('driverId');
        console.log(id);
        setDriverId(id);
      } catch (error) {
        console.error('Lỗi khi lấy driverId:', error);
      }
    };

    fetchDriverId();
  }, []);

  // Xử lý bật/tắt nhận đơn
  const toggleSwitch = async () => {
    if (!driverId) {
      Alert.alert('Lỗi', 'Không thể lấy thông tin tài xế.');
      return;
    }

    setIsLoading(true);

    try {
      await changeStatus(driverId);
      setIsReceivingOrders(prevState => !prevState);
      Alert.alert(
        'Thành công',
        isReceivingOrders ? 'Bạn đã tắt nhận đơn.' : 'Bạn đã bật nhận đơn.',
      );
    } catch (error) {
      console.error('Lỗi khi bật/tắt nhận đơn:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái nhận đơn.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.label}>
        {isReceivingOrders ? 'Đang nhận đơn' : 'Tắt nhận đơn'}
      </Text>
      <Switch
        onValueChange={toggleSwitch}
        value={isReceivingOrders}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, // Căn lề phải để không chạm mép màn hình
  },
  label: {
    fontSize: 14,
    marginRight: 5,
    color: '#000',
  },
});

export default HeaderSwitch;
