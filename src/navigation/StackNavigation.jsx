import { ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import InformationScreen from '../screens/InformationScreen';
import QRScanner from '../screens/QRScanner';
import Test from '../screens/Test';
import StatisticScreen from '../screens/StatisticScreen';
import WalletScreen from '../screens/WalletScreen';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


// Drawer for MainScreen and Profile
const MainDrawer = () => (
    <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: true }}
    >
        <Drawer.Screen
            name="Home"
            component={MainScreen}
            options={({ navigation }) => ({
                headerRight: () => <HeaderSwitch />,
            })}
        />
        <Drawer.Screen
            name="Đơn đã giao"
            component={OrderScreen}
        />
        <Drawer.Screen
            name="Statistic"
            component={StatisticScreen}
            options={{ title: 'Thống kê' }}
        />
        <Drawer.Screen
            name="Tài khoản"
            component={AccountScreen}
        />
        {/* <Drawer.Screen
            name="Profile"
            component={Profile}
            options={({ navigation }) => ({
                headerRight: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 16 }}
                        onPress={() => handleLogout(navigation)}
                    >
                        <Text style={{ color: '#FF0000', marginRight: 10 }}>Đăng xuất</Text>
                    </TouchableOpacity>
                ),
            })}
        /> */}
    </Drawer.Navigator>
);

const StackNavigation = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchToken = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");
            console.log("Fetched token:", token);
            setAccessToken(token);
        } catch (error) {
            console.error("Failed to retrieve access token:", error);
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
            initialRouteName={accessToken ? "MainDrawer" : "Auth"}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen
                name="Đăng kí thông tin"
                component={RegisterInf}
                options={{ headerShown: true, headerBackTitle: "Quay lại" }}
            />
            <Stack.Screen name="MainDrawer" component={MainDrawer} />
            <Stack.Screen
                name="OrderDetail"
                component={OrderDetailScreen}
                options={{ headerShown: true, headerBackTitle: "Quay lại", title: "Chi tiết" }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: true, headerBackTitle: "Quay lại", title: "Thông tin" }}
            />
            <Stack.Screen name="Review" component={ReviewScreen} options={{ headerShown: true, headerBackTitle: "Quay lại", title: "Đánh giá" }} />
            <Stack.Screen
                name="Information"
                component={InformationScreen}
                options={{ headerShown: true, headerBackTitle: "Quay lại", title: "Thông tin" }}
            />
            <Stack.Screen
                name="test"
                component={Test}
                options={{ headerShown: true, headerBackTitle: "Quay lại", title: "Thông tin" }}
            />
            <Stack.Screen
                name="QRScanner"
                component={QRScanner}
                options={{ headerShown: true, headerBackTitle: "Quay lại", title: "Scan QR" }}
            />
            <Stack.Screen
                name="Wallet"
                component={WalletScreen}
                options={{ headerShown: true, headerBackTitle: "Quay lại", title: "Ví" }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigation;
