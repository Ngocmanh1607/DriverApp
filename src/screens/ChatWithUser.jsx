import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Platform,
  Alert,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import {useRoute} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Thay URL server của bạn
const socket = io('http://localhost:3000');

// Hàm kiểm tra quyền truy cập thư viện ảnh
const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Quyền truy cập thư viện ảnh',
        message: 'Ứng dụng cần quyền truy cập thư viện ảnh để gửi ảnh.',
        buttonNeutral: 'Hỏi lại sau',
        buttonNegative: 'Hủy',
        buttonPositive: 'Đồng ý',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS tự động cấp quyền
};

// Hàm kiểm tra quyền truy cập camera
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Quyền truy cập Camera',
        message: 'Ứng dụng cần quyền truy cập camera để chụp ảnh.',
        buttonNeutral: 'Hỏi lại sau',
        buttonNegative: 'Hủy',
        buttonPositive: 'Đồng ý',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS tự động cấp quyền
};

const MessageScreen = () => {
  const route = useRoute();
  const {driverId, customerId} = route.params;
  const scrollViewRef = useRef();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Đăng ký driverId với server khi vào màn hình
    if (driverId) {
      socket.emit('registerUser', driverId);
    }

    // Lắng nghe tin nhắn từ server
    socket.on('receiveMessage', ({senderId, message, type}) => {
      console.log('Message received:', {senderId, message, type});
      setMessages(prevMessages => [...prevMessages, {senderId, message, type}]);
    });
    return () => {
      socket.off('receiveMessage');
    };
  }, [driverId, customerId]);

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (messages.length > 0 && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({animated: true});
      }, 100);
    }
  }, [messages]);

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        'Quyền bị từ chối',
        'Bạn cần cấp quyền để sử dụng tính năng này.',
      );
      return;
    }
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const base64Image = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
          sendImage(base64Image);
        }
      },
    );
  };

  // Hàm chụp ảnh từ camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Quyền bị từ chối',
        'Bạn cần cấp quyền để sử dụng tính năng này.',
      );
      return;
    }
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          const base64Image = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
          sendImage(base64Image);
        }
      },
    );
  };

  // Hàm gửi ảnh
  const sendImage = base64Image => {
    socket.emit('sendMessage', {
      senderId: driverId,
      receiverId: customerId,
      message: base64Image,
      type: 'image',
    });

    setMessages(prevMessages => [
      ...prevMessages,
      {senderId: driverId, message: base64Image, type: 'image'},
    ]);
  };

  // Hàm gửi tin nhắn văn bản
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', {
        senderId: driverId,
        receiverId: customerId,
        message: message.trim(),
        type: 'text',
      });

      setMessages(prevMessages => [
        ...prevMessages,
        {senderId: driverId, message: message.trim(), type: 'text'},
      ]);
      setMessage('');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContentContainer}>
        {messages.map((msg, index) => (
          <View key={index}>
            <View
              style={[
                styles.messageBubble,
                msg.senderId === driverId
                  ? styles.userMessage
                  : styles.contactMessage,
              ]}>
              {msg.type === 'text' ? (
                <Text
                  style={[
                    styles.messageText,
                    msg.senderId === driverId
                      ? styles.userMessageText
                      : styles.contactMessageText,
                  ]}>
                  {msg.message}
                </Text>
              ) : (
                <Image
                  source={{uri: msg.message}}
                  style={styles.imageMessage}
                />
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Chat Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Nhập tin nhắn..."
              value={message}
              onChangeText={text => {
                setMessage(text);
                // Thông báo đang nhập
                socket.emit('typing', {
                  userId: driverId,
                  receiverId: customerId,
                });
              }}
              multiline
            />
            <View style={styles.attachButtonsContainer}>
              <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
                <Text style={styles.iconText}>📷</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
                <Text style={styles.iconText}>📸</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}>
            <Text style={styles.sendButtonText}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#075E54',
    fontSize: 16,
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  typingText: {
    color: '#075E54',
    fontSize: 14,
    fontStyle: 'italic',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 5,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderTopRightRadius: 2,
    marginLeft: 50,
  },
  contactMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 2,
    marginRight: 50,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#000',
  },
  contactMessageText: {
    color: '#000',
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F0F0F0',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 16,
  },
  attachButtonsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  iconText: {
    fontSize: 20,
  },
  sendButton: {
    width: 45,
    height: 45,
    backgroundColor: '#075E54',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#A8BEC0',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
});
