import { StyleSheet } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthScreen from '../screens/AuthScreen';
import MainScreen from '../screens/MainScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import Profile from '../screens/Profile';
import RegisterInf from '../screens/RegisterInf';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer for MainScreen and Profile
const MainDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Home" component={MainScreen} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
};

// Stack Navigator
const StackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Đăng kí thông tin" component={RegisterInf} options={{ headerShown: true, headerBackTitle: "Quay lại" }} />
            <Stack.Screen name="MainDrawer" component={MainDrawer} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigation;

const styles = StyleSheet.create({});