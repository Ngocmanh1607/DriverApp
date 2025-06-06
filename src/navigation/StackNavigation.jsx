import {ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from '../screens/AuthScreen';
import MainScreen from '../screens/MainScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import Profile from '../screens/Profile';
import RegisterInf from '../screens/RegisterInf';
import HeaderSwitch from '../components/HeaderSwitch';
import OrderScreen from '../screens/OrderScreen';
import ReviewScreen from '../screens/ReviewScreen';
import AccountScreen from '../screens/AccountScreen';
import QRScanner from '../screens/QRScanner';
import Test from '../screens/Test';
import StatisticScreen from '../screens/StatisticScreen';
import WalletScreen from '../screens/WalletScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import MessageScreen from '../screens/ChatWithUser';
import OrderHisDetailScreen from '../screens/OrderHisDetailScreen';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer for MainScreen and Profile
const MainDrawer = () => (
  <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: true}}>
    <Drawer.Screen
      name="Home"
      component={MainScreen}
      options={({navigation}) => ({
        headerRight: () => <HeaderSwitch />,
      })}
    />
    <Drawer.Screen name="Đơn đã giao" component={OrderScreen} />
    <Drawer.Screen
      name="Statistic"
      component={StatisticScreen}
      options={{title: 'Thống kê'}}
    />
    <Drawer.Screen name="Tài khoản" component={AccountScreen} />
  </Drawer.Navigator>
);

const StackNavigation = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Fetched token:', token);
      setAccessToken(token);
    } catch (error) {
      console.error('Failed to retrieve access token:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Stack.Navigator
      initialRouteName={accessToken ? 'MainDrawer' : 'Auth'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen
        name="RegisterInf"
        component={RegisterInf}
        options={{
          headerShown: true,
          headerBackTitle: 'Quay lại',
          title: 'Đăng kí thông tin',
        }}
      />
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{
          headerShown: true,
          headerBackTitle: 'Quay lại',
          title: 'Chi tiết',
        }}
      />
      <Stack.Screen
        name="OrderHisDetail"
        component={OrderHisDetailScreen}
        options={{
          headerShown: true,
          headerBackTitle: 'Quay lại',
          title: 'Chi tiết',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerBackTitle: 'Quay lại',
          title: 'Thông tin',
        }}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          headerShown: true,
          headerBackTitle: 'Quay lại',
          title: 'Đánh giá',
        }}
      />
      <Stack.Screen
        name="test"
        component={Test}
        options={{
          headerShown: true,
          headerBackTitle: 'Quay lại',
          title: 'Thông tin',
        }}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScanner}
        options={{
          headerShown: true,
          headerBackTitle: 'Quay lại',
          title: 'Scan QR',
        }}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{headerShown: true, headerBackTitle: 'Quay lại', title: 'Ví'}}
      />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen
        name="ChatWithUser"
        component={MessageScreen}
        options={{
          headerShown: true,
          headerBackTitle: 'Quay lại',
          title: 'Tin nhắn',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
