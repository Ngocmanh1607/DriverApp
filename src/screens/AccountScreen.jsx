import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import styles from '../assets/css/AccountStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AccountScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      title: 'Chỉnh sửa thông tin',
      icon: 'person',
      path: 'Profile',
    },
    {
      title: 'Đổi mật khẩu',
      icon: 'lock',
      path: 'ChangePassword',
    },
    {
      title: 'Xem đánh giá',
      icon: 'star',
      path: 'Review',
    },
    {
      title: 'Thanh toán',
      icon: 'payment',
      path: 'Wallet',
    },
    // {
    //   title: 'Cài đặt',
    //   icon: 'settings',
    //   path: 'Settings',
    // },
  ];

  const handleNavigate = path => {
    navigation.navigate(path);
  };

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất không?', [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Đăng xuất',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('userId');
            navigation.reset({
              index: 0,
              routes: [{name: 'Auth'}],
            });
          } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại sau.');
          }
        },
      },
    ]);
  };

  const MenuItem = ({item}) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleNavigate(item.path)}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemLeft}>
          <Icon name={item.icon} size={24} color="#333" />
          <Text style={styles.menuItemText}>{item.title}</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#999" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.title}>
              <MenuItem item={item} />
              {index < menuItems.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.menuItemContent}>
            <View style={styles.menuItemLeft}>
              <Icon name="exit-to-app" size={24} color="#FF4444" />
              <Text style={[styles.menuItemText, styles.logoutText]}>
                Đăng xuất
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#FF4444" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
