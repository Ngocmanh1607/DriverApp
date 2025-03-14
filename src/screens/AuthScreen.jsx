import { StyleSheet, Text, View, LogBox, useWindowDimensions, Animated, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import images from '../assets/images';
const TabScreen = () => {
    LogBox.ignoreLogs(['A props object containing a "key" prop is being spread into JSX']);

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'login', title: 'Đăng nhập' },
        { key: 'signup', title: 'Đăng ký' },
    ]);

    const renderScene = SceneMap({
        login: LoginScreen,
        signup: SignupScreen,
    });

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            renderLabel={({ route, focused }) => (
                <Text style={[styles.label, { color: focused ? '#FF0000' : '#000' }]}>
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    );
};
const AuthScreen = () => {
    const slideAnim = useRef(new Animated.Value(1000)).current;
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);
    return (
        <View style={styles.container}>
            <View style={styles.topImageContainer}>
                <Image source={images.logo} style={styles.topImage} />
            </View>
            <Animated.View style={[styles.animatedContainer, { transform: [{ translateY: slideAnim }] }]}>
                <TabScreen />
            </Animated.View>
        </View>

    );
};
export default AuthScreen

const styles = StyleSheet.create({
    indicator: {
        backgroundColor: "#FF0000",
        width: '30%',
        marginHorizontal: '10%'
    },
    tabBar: {
        zIndex: 1,
        backgroundColor: "#fff",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        zIndex: 0,
    },
    topImageContainer: {
        height: "35%",
        flexDirection: 'row',
        justifyContent: 'center',
    },
    topImage: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover', // Đảm bảo hình ảnh phủ kín phần trên
    },
    animatedContainer: {
        flex: 1,
        left: 0,
        right: 0,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        zIndex: 1,
    },
})