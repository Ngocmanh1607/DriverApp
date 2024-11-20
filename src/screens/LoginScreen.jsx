import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import PasswordInput from '../components/PasswordInput';
import { loginApi } from '../api/driverApi';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let errors = {};

        // Validate email
        if (!email) {
            valid = false;
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            valid = false;
            errors.email = 'Email address is invalid';
        }

        // Validate password
        if (!password) {
            valid = false;
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            valid = false;
            errors.password = 'Password must be at least 6 characters';
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const response = await loginApi(email, password);
                if (response) {
                    Alert.alert('Login Successful', `Welcome, ${email}!`);
                    navigation.navigate('MainDrawer');
                }
            } catch (error) {
                console.log(error)
                Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View>
                    <View style={styles.inputContainer}>
                        <Fontisto name="email" color="#9a9a9a" size={22} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Email'
                            placeholderTextColor='#A9A9A9'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    <PasswordInput
                        value={password}
                        onChangeText={setPassword}
                        placeholderText="Password"
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    <TouchableOpacity>
                        <Text style={styles.forgotPassText}>Forget password?</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.loginButtonContainer}
                        onPress={handleSubmit}>
                        <Text style={styles.textLogin}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.horizontalLine} />

                <View>
                    <TouchableOpacity style={styles.googleButtonContainer}>
                        {/* <Image source={require("../access/Images/ic_google.png")} style={styles.topImage} /> */}
                        <Text style={styles.textLoginGoogle}>Login with Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        color: "#222222"
    },
    forgotPassText: {
        color: "#FF0000",
        textAlign: 'right',
        width: '90%',
        fontSize: 15,
        marginVertical: 10,
    },
    loginButtonContainer: {
        width: '70%',
        height: 50,
        backgroundColor: "#FF0000",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 10,
        elevation: 5
    },
    textLogin: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    horizontalLine: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        width: '40%',
        alignSelf: 'center'
    },
    googleButtonContainer: {
        flexDirection: 'row',
        width: '70%',
        height: 50,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 10,
        elevation: 5,
    },
    textLoginGoogle: {
        color: '#222222',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal: 40,
        marginVertical: 10,
        elevation: 10,
        alignItems: 'center',
        height: 50,
    },
    errorText: {
        marginStart: 50,
        color: 'red',
        fontSize: 14
    },
});