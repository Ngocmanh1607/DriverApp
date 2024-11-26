import { StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const handleLogout = (navigation) => {
    navigation.replace('Auth'); // Chuyển hướng đến màn hình đăng nhập
};

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
        />
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
        </Stack.Navigator>
    );
};

export default StackNavigation;

const styles = StyleSheet.create({});
