import { Text, TextInput, TouchableOpacity, View, Image, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import PasswordInput from '../components/PasswordInput';
import { loginApi } from '../api/driverApi';
import styles from '../assets/css/LoginStyle';
import Loading from '../components/Loading';
const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const validate = () => {
        let valid = true;
        let errors = {};

        // Validate email
        if (!email) {
            valid = false;
            errors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            valid = false;
            errors.email = 'Địa chỉ email không tồn tại';
        }

        // Validate password
        if (!password) {
            valid = false;
            errors.password = 'Mật khẩu là bắt buộc';
        } else if (password.length < 6) {
            valid = false;
            errors.password = 'Mật khẩu phải chứa ít nhất 6 kí tự';
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validate()) {
            setIsLoading(true)
            try {
                const response = await loginApi(email, password);
                if (response) {
                    navigation.navigate('MainDrawer');
                }
            } catch (error) {
                console.log(error)
                Alert.alert('Đăng nhập thất bại', 'Email hoặc mật khẩu không chính xác! Vui lòng thử lại');
            }
            finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
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
                            placeholderText="Mật khẩu"
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        <TouchableOpacity>
                            <Text style={styles.forgotPassText}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={styles.loginButtonContainer}
                            onPress={handleSubmit}>
                            <Text style={styles.textLogin}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={styles.horizontalLine} /> */}

                    {/* <View>
                    <TouchableOpacity style={styles.googleButtonContainer}>
                        <Image source={require("../access/Images/ic_google.png")} style={styles.topImage} />
                        <Text style={styles.textLoginGoogle}>Login with Google</Text>
                    </TouchableOpacity>
                </View> */}
                </View>
            </TouchableWithoutFeedback>
            {isLoading && <Loading />}
        </View>

    );
};

export default LoginScreen;
