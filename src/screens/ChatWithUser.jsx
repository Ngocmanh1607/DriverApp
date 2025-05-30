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
  Linking,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import {useRoute} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Thay URL server của bạn
const socket = io('https://vpvt75qh-3000.asse.devtunnels.ms');

// Hàm kiểm tra và yêu cầu quyền truy cập thư viện ảnh
const requestGalleryPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return true; // iOS tự động xử lý quyền thông qua Info.plist
    }

    // Đối với Android 13+ (API 33+), cần quyền READ_MEDIA_IMAGES
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Quyền truy cập ảnh',
          message:
            'Ứng dụng cần quyền truy cập ảnh để gửi hình ảnh trong chat.',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Từ chối',
          buttonPositive: 'Cho phép',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Cần cấp quyền',
          'Bạn đã từ chối quyền truy cập ảnh. Vui lòng vào Cài đặt > Ứng dụng > [Tên app] > Quyền để cấp quyền.',
          [
            {text: 'Hủy', style: 'cancel'},
            {text: 'Mở cài đặt', onPress: () => Linking.openSettings()},
          ],
        );
        return false;
      }
      return false;
    } else {
      // Đối với Android < 13, sử dụng READ_EXTERNAL_STORAGE
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Quyền truy cập thư viện ảnh',
          message:
            'Ứng dụng cần quyền truy cập thư viện ảnh để gửi hình ảnh trong chat.',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Từ chối',
          buttonPositive: 'Cho phép',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Cần cấp quyền',
          'Bạn đã từ chối quyền truy cập thư viện ảnh. Vui lòng vào Cài đặt > Ứng dụng > [Tên app] > Quyền để cấp quyền.',
          [
            {text: 'Hủy', style: 'cancel'},
            {text: 'Mở cài đặt', onPress: () => Linking.openSettings()},
          ],
        );
        return false;
      }
      return false;
    }
  } catch (error) {
    console.error('Lỗi khi yêu cầu quyền truy cập thư viện ảnh:', error);
    Alert.alert(
      'Lỗi',
      'Có lỗi xảy ra khi yêu cầu quyền truy cập thư viện ảnh.',
    );
    return false;
  }
};

// Hàm kiểm tra và yêu cầu quyền truy cập camera
const requestCameraPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return true; // iOS tự động xử lý quyền thông qua Info.plist
    }

    // Kiểm tra quyền hiện tại
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (hasPermission) {
      return true;
    }

    // Yêu cầu quyền camera
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Quyền truy cập Camera',
        message:
          'Ứng dụng cần quyền truy cập camera để chụp và gửi ảnh trong chat.',
        buttonNeutral: 'Hỏi lại sau',
        buttonNegative: 'Từ chối',
        buttonPositive: 'Cho phép',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Đã cấp quyền camera');
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Cần cấp quyền',
        'Bạn đã từ chối quyền truy cập camera. Vui lòng vào Cài đặt > Ứng dụng > [Tên app] > Quyền để cấp quyền camera.',
        [
          {text: 'Hủy', style: 'cancel'},
          {text: 'Mở cài đặt', onPress: () => Linking.openSettings()},
        ],
      );
      return false;
    } else {
      console.log('Quyền camera bị từ chối');
      return false;
    }
  } catch (error) {
    console.error('Lỗi khi yêu cầu quyền camera:', error);
    Alert.alert('Lỗi', 'Có lỗi xảy ra khi yêu cầu quyền truy cập camera.');
    return false;
  }
};

const formatTime = dateString => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  if (isToday) {
    return `${hours}:${minutes}`;
  } else {
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
};

const MessageScreen = () => {
  const route = useRoute();
  const {driverId, customerId} = route.params;
  const scrollViewRef = useRef();
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const MESSAGES_PER_PAGE = 20;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
        }
      } catch (error) {
        console.error('Lỗi khi lấy userId:', error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      socket.emit('registerUser', userId);
      socket.emit('joinChat', {
        senderId: driverId,
        receiverId: customerId,
        role: 'driver',
        role_receiver: 'user',
      });
      socket.on('chatHistory', chatHistory => {
        if (chatHistory) {
          const filterMessageProperties = messages => {
            return messages.map(msg => ({
              senderId: msg.senderId,
              message: msg.message.trim(),
              role: msg.role,
              type: msg.type,
              date: msg.date,
            }));
          };
          const listMessages = filterMessageProperties(chatHistory.messages);

          setMessages(listMessages);
        } else {
          console.log('No chat history found');
          setMessages([]);
        }
      });
      // Listen for more messages response
      socket.on('moreMessages', ({messages, hasMore}) => {
        setMessages(prevMessages => [...messages, ...prevMessages]);
        setHasMore(hasMore);
        setIsLoadingMore(false);
      });

      // Listen for load more errors
      socket.on('loadMoreError', ({message}) => {
        console.error('Load more error:', message);
        setIsLoadingMore(false);
        Alert.alert('Error', 'Failed to load older messages');
      });
    }

    // Lắng nghe tin nhắn từ server
    const handleReceiveMessage = ({senderId, message, type, role, date}) => {
      console.log('Received message:', {
        senderId,
        message,
        type,
      });

      console.log('Message received:', {senderId, message, role, type, date});
      setMessages(prevMessages => [
        ...prevMessages,
        {senderId, message, role, type, date},
      ]);
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('moreMessages');
      socket.off('loadMoreError');
    };
  }, [userId]);

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
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: true,
        maxWidth: 1000,
        maxHeight: 1000,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert(
            'Lỗi',
            'Có lỗi xảy ra khi chọn ảnh: ' + response.errorMessage,
          );
        } else if (response.assets && response.assets.length > 0) {
          try {
            const base64Image = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
            sendImage(base64Image);
          } catch (error) {
            console.error('Lỗi khi xử lý ảnh:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi xử lý ảnh.');
          }
        }
      },
    );
  };

  // Hàm chụp ảnh từ camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: true,
        maxWidth: 1000,
        maxHeight: 1000,
        cameraType: 'back',
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
          Alert.alert(
            'Lỗi',
            'Có lỗi xảy ra khi chụp ảnh: ' + response.errorMessage,
          );
        } else if (response.assets && response.assets.length > 0) {
          try {
            const base64Image = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
            sendImage(base64Image);
          } catch (error) {
            console.error('Lỗi khi xử lý ảnh:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi xử lý ảnh.');
          }
        }
      },
    );
  };

  // Hàm gửi ảnh
  const sendImage = base64Image => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.toISOString();

      socket.emit('sendMessage', {
        senderId: driverId,
        receiverId: customerId,
        message: base64Image,
        role: 'driver',
        type: 'image',
        date: timestamp,
        role_receiver: 'user',
      });

      // setMessages(prevMessages => [
      //   ...prevMessages,
      //   {
      //     senderId: driverId,
      //     message: base64Image,
      //     type: 'image',
      //     role: 'driver',
      //     date: timestamp,
      //   },
      // ]);
    } catch (error) {
      console.error('Lỗi khi gửi ảnh:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi ảnh.');
    }
  };

  // Hàm gửi tin nhắn văn bản
  const sendMessage = () => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.toISOString();

      if (message.trim()) {
        socket.emit('sendMessage', {
          senderId: driverId,
          receiverId: customerId,
          message: message.trim(),
          role: 'driver',
          type: 'text',
          date: timestamp,
          role_receiver: 'user',
        });

        // setMessages(prevMessages => [
        //   ...prevMessages,
        //   {
        //     senderId: driverId,
        //     message: message.trim(),
        //     role: 'driver',
        //     type: 'text',
        //     date: timestamp,
        //   },
        // ]);
        setMessage('');
      }
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi tin nhắn.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContentContainer}
        onScroll={({nativeEvent}) => {
          // Check if scrolled to top
          if (nativeEvent.contentOffset.y === 0 && hasMore) {
            loadMoreMessages();
          }
        }}
        scrollEventThrottle={400}>
        {isLoadingMore && (
          <View style={styles.loadingMoreContainer}>
            <Text style={styles.loadingMoreText}>Loading more messages...</Text>
          </View>
        )}
        {messages.map((msg, index) => (
          <View key={index}>
            <View
              style={[
                styles.messageBubble,
                msg.role === 'driver'
                  ? styles.userMessage
                  : styles.contactMessage,
              ]}>
              {msg.type === 'text' ? (
                <Text
                  style={[
                    styles.messageText,
                    msg.role === 'driver'
                      ? styles.userMessageText
                      : styles.contactMessageText,
                  ]}>
                  {msg.message}
                </Text>
              ) : (
                <Image
                  source={{uri: msg.message}}
                  style={styles.imageMessage}
                  resizeMode="cover"
                />
              )}
            </View>
            {/* Hiển thị thời gian gửi */}
            <Text
              style={[
                styles.timestamp,
                msg.role === 'driver'
                  ? styles.userTimestamp
                  : styles.contactTimestamp,
              ]}>
              {formatTime(msg.date)}
            </Text>
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
              }}
              multiline
              maxLength={1000}
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
            <Text style={styles.sendButtonText}>Gửi</Text>
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
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  userTimestamp: {
    textAlign: 'right',
    marginLeft: 50,
  },
  contactTimestamp: {
    textAlign: 'left',
    marginRight: 50,
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
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 16,
    color: '#333',
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
    fontWeight: '500',
    fontSize: 16,
  },
  loadingMoreContainer: {
    padding: 10,
    alignItems: 'center',
  },
  loadingMoreText: {
    color: '#666',
    fontSize: 14,
  },
});
