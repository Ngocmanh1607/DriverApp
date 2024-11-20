import { StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from '../screens/AuthScreen';
import MainScreen from '../screens/MainScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import Profile from '../screens/Profile';
import RegisterInf from '../screens/RegisterInf';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer for MainScreen and Profile
const MainDrawer = () => (
    <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: true }}
    >
        <Drawer.Screen name="Home" component={MainScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
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
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ headerShown: true, headerBackTitle: "Quay lại", title: " Chi tiết" }} />
        </Stack.Navigator>
    );
};

export default StackNavigation;

const styles = StyleSheet.create({});
