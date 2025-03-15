import { useWindowDimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useState } from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import PasswordInput from '../components/PasswordInput';
import { useNavigation } from '@react-navigation/native';
import { signupApi } from '../api/driverApi';
import styles from '../assets/css/SignupStyle';
import Loading from '../components/Loading';
const SignupScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let valid = true;
        let errors = {};

        // Validate email
        if (!email) {
            valid = false;
            errors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            valid = false;
            errors.email = 'Địa chỉ email không chính xác';
        }

        // Validate password
        if (!password) {
            valid = false;
            console.log(password)
            errors.password = 'Mật khẩu là bắt buộc';
        } else if (password.length < 6) {
            valid = false;
            errors.password = 'Mật khẩu chứa ít nhất 6 kí tự';
        }

        // Validate confirmPassword
        if (!confirmPassword) {
            valid = false;
            errors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
        } else if (password !== confirmPassword) {
            valid = false;
            errors.confirmPassword = 'Xác nhận mật khẩu không khớp';
        }

        setErrors(errors);
        return valid;
    };

    const handleSignUp = async () => {
        if (validate()) {
            setLoading(true);
            try {
                const response = await signupApi(email, password);
                Alert.alert(
                    'Thành công',
                    'Đăng ký tài khoản thành công!',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Đăng kí thông tin')
                        }
                    ]
                );
            } catch (error) {
                if (error.message === 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng') {
                    Alert.alert('Lỗi kết nối', error.message);
                } else if (error.message === 'Có lỗi xảy ra từ phía server') {
                    Alert.alert('Lỗi hệ thống', error.message);
                } else if (error.message === 'Email đã được đăng ký') {
                    Alert.alert('Lỗi đăng ký', 'Email này đã được đăng ký. Vui lòng sử dụng email khác.');
                    setErrors({ email: error.message });
                } else {
                    setErrors({ apiError: 'Đăng ký thất bại. Vui lòng thử lại sau' });
                    Alert.alert('Lỗi', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
                }
                console.error('Signup error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.inputSignContainer}>
                        <Fontisto name="email" color="#9a9a9a" size={22} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            placeholderTextColor="#A9A9A9"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setErrors({ ...errors, email: null, apiError: null });
                            }}
                        />
                    </View>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    <PasswordInput
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setErrors({ ...errors, password: null });
                        }}
                        placeholderText="Mật khẩu"
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    <PasswordInput
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            setErrors({ ...errors, confirmPassword: null });
                        }}
                        placeholderText="Xác nhận mật khẩu"
                    />
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                    {errors.apiError && <Text style={styles.errorText}>{errors.apiError}</Text>}

                    <TouchableOpacity style={styles.loginButtonContainer} onPress={handleSignUp} >
                        <Text style={styles.textLogin}> Đăng kí</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={styles.loginButtonContainer} onPress={() => navigation.navigate('Đăng kí thông tin')}>
                <Text style={styles.buttonText}>Quét cccd</Text>
            </TouchableOpacity>
            {loading && <Loading />}
        </View>
    );
}

export default SignupScreen;
