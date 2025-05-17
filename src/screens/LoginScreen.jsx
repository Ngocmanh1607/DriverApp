import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import PasswordInput from '../components/PasswordInput';
import {loginApi, resetPasswordApi} from '../api/driverApi';
import styles from '../assets/css/LoginStyle';
import Loading from '../components/Loading';
import checkRegister from '../utils/checkRegister';
import extractErrorMessageFromHTML from '../utils/extractErrorFromPre';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [isResetModalVisible, setResetModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetErrors, setResetErrors] = useState({});

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
      setIsLoading(true);
      try {
        await loginApi(email, password);
      } catch (error) {
        // const messaging = extractErrorMessageFromHTML(error);
        // console.log(messaging);
        if (
          error.message ===
          'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng'
        ) {
          Alert.alert('Lỗi kết nối', error.message);
        } else if (error.message === 'Có lỗi xảy ra từ phía server') {
          Alert.alert('Lỗi hệ thống', error.message);
        } else if (error.message === 'Email hoặc mật khẩu không chính xác') {
          Alert.alert('Đăng nhập thất bại', error.message);
        } else {
          Alert.alert('Lỗi', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
        console.error('Login error:', error);
        setIsLoading(false);
        return;
      }
      const hasRegis = await checkRegister();
      if (hasRegis) {
        navigation.navigate('MainDrawer');
      } else {
        navigation.navigate('RegisterInf');
      }
    }
  };
  const handleResetPassword = async () => {
    // Validate inputs
    let valid = true;
    let errors = {};

    if (!resetEmail) {
      valid = false;
      errors.resetEmail = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      valid = false;
      errors.resetEmail = 'Địa chỉ email không hợp lệ';
    }

    if (!newPassword) {
      valid = false;
      errors.newPassword = 'Mật khẩu mới là bắt buộc';
    } else if (newPassword.length < 6) {
      valid = false;
      errors.newPassword = 'Mật khẩu phải chứa ít nhất 6 kí tự';
    }

    setResetErrors(errors);

    if (valid) {
      setIsLoading(true);
      try {
        await resetPasswordApi(resetEmail, newPassword);
        Alert.alert('Thành công', 'Mật khẩu đã được cập nhật');
        setResetModalVisible(false);
        setResetEmail('');
        setNewPassword('');
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể đặt lại mật khẩu. Vui lòng thử lại sau');
      } finally {
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
              <Fontisto
                name="email"
                color="#9a9a9a"
                size={22}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#A9A9A9"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <PasswordInput
              value={password}
              onChangeText={setPassword}
              placeholderText="Mật khẩu"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity onPress={() => setResetModalVisible(true)}>
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
        </View>
      </TouchableWithoutFeedback>
      {isLoading && <Loading />}
      <Modal
        visible={isResetModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setResetModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setResetModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Đặt lại mật khẩu</Text>
                  <TouchableOpacity onPress={() => setResetModalVisible(false)}>
                    <Fontisto name="close" size={20} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={[styles.inputContainer, {marginHorizontal: 10}]}>
                  <Fontisto
                    name="email"
                    color="#9a9a9a"
                    size={22}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#A9A9A9"
                    value={resetEmail}
                    onChangeText={setResetEmail}
                  />
                </View>
                {resetErrors.resetEmail && (
                  <Text style={styles.errorText}>{resetErrors.resetEmail}</Text>
                )}
                <View style={{marginHorizontal: -30}}>
                  <PasswordInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholderText="Mật khẩu mới"
                  />
                </View>
                {resetErrors.newPassword && (
                  <Text style={styles.errorText}>
                    {resetErrors.newPassword}
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleResetPassword}>
                  <Text style={styles.resetButtonText}>Đặt lại mật khẩu</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default LoginScreen;
