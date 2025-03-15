import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiClient";
import fetchFcmToken from "../utils/fcmToken";
const apiKey = '123';
const signupApi = async (email, password) => {
    try {
        // const fcmToken = await fetchFcmToken();
        const fcmToken = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const response = await apiClient.post(
            "/user/signup",
            { email, password, fcmToken, role: "driver" },
            {
                headers: {
                    "x-api-key": apiKey
                }
            }
        );
        const { accessToken, refreshToken } = metadata.tokens;
        const { email: userEmail, id: userId } = metadata.user;
        console.log('Data stored successfully:', {
            accessToken,
            refreshToken,
            userEmail,
            userId
        });

        await AsyncStorage.multiSet([
            ['accessToken', accessToken],
            ['refreshToken', refreshToken],
            ['userEmail', userEmail],
            ['userId', userId.toString()]
        ]);

        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
};

const loginApi = async (email, password) => {
    try {
        const response = await apiClient.post(
            "/user/login",
            {
                email: email,
                password: password
            },
            {
                headers: {
                    "x-api-key": apiKey,
                }
            }
        );
        const { message, metadata } = response.data;
        if (!message) {
            throw new Error('Không nhận được phản hồi từ server');
        }

        const { accessToken, refreshToken } = metadata.tokens;
        const { email: userEmail, id: userId } = metadata.user;

        await AsyncStorage.multiSet([
            ['accessToken', accessToken],
            ['refreshToken', refreshToken],
            ['userEmail', userEmail],
            ['userId', userId.toString()]
        ]);

        console.log('User logged in successfully:', {
            accessToken,
            refreshToken,
            userEmail,
            userId
        });

        return metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
};

const updateDriver = async (driver) => {
    try {
        if (!driver || !driver.name) {
            throw new Error("Thông tin cập nhật không hợp lệ");
        }

        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("Người dùng chưa đăng nhập");
        }

        const response = await apiClient.put(`/profile`,
            {
                profile: {
                    name: driver.name,
                    image: driver.image,
                    date: driver.date,
                    phone_number: driver.phone_number,
                },
            },
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );

        if (!response || !response.data || !response.data.metadata) {
            throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ");
        }

        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
}

const updateLicenseDriver = async (info) => {
    try {
        if (!info || !info.name || !info.license_plate) {
            throw new Error("Thông tin xe không hợp lệ");
        }

        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("Người dùng chưa đăng nhập");
        }

        const response = await apiClient.put(`/driver`,
            {
                driver: {
                    car_name: info.name,
                    license_plate: info.license_plate
                }
            },
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );

        if (!response || !response.data || !response.data.metadata) {
            throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ");
        }

        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
}

const acceptOrder = async (orderId) => {
    try {
        if (!orderId) {
            throw new Error("Mã đơn hàng không hợp lệ");
        }

        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("Người dùng chưa đăng nhập");
        }

        const response = await apiClient.get(`driver/accept/${orderId}`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );

        if (!response || !response.data || !response.data.metadata) {
            throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ");
        }

        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
}

const rejectOrder = async (orderId) => {
    try {
        if (!orderId) {
            throw new Error("Mã đơn hàng không hợp lệ");
        }

        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("Người dùng chưa đăng nhập");
        }

        const response = await apiClient.get(`/driver/reject/${orderId}`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );

        if (!response || !response.data || !response.data.metadata) {
            throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ");
        }

        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
}

const confirmOrder = async (orderId) => {
    try {
        if (!orderId) {
            throw new Error("Mã đơn hàng không hợp lệ");
        }

        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("Người dùng chưa đăng nhập");
        }

        const response = await apiClient.get(`/driver/confirm/${orderId}`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );

        if (!response || !response.data || !response.data.metadata) {
            throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ");
        }

        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
}

const getInfoUser = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("Người dùng chưa đăng nhập");
        }

        const response = await apiClient.get(`/driver/detail`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );

        if (!response || !response.data || !response.data.metadata) {
            throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ");
        }

        await AsyncStorage.setItem('driverId', response.data.metadata.Driver.id.toString());
        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
}

const giveOrder = async (orderId) => {
    try {
        if (!orderId) {
            throw new Error("Mã đơn hàng không hợp lệ");
        }

        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("Người dùng chưa đăng nhập");
        }

        const response = await apiClient.get(`/driver/give/${orderId}`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );

        if (!response || !response.data || !response.data.metadata) {
            throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ");
        }

        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
}

const getOrder = async (driverId) => {
    try {
        if (!driverId) {
            throw new Error("ID tài xế không hợp lệ");
        }

        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("Người dùng chưa đăng nhập");
        }

        const response = await apiClient.get(`/driver/${driverId}/order`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );

        if (!response || !response.data || !response.data.metadata) {
            throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ");
        }

        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
}

const changeStatus = async (driver_id) => {
    try {
        if (!driver_id) {
            throw new Error("ID tài xế không hợp lệ");
        }

        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("Người dùng chưa đăng nhập");
        }

        const response = await apiClient.put(`/driver/${driver_id}`,
            {},
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );

        if (!response || !response.data || !response.data.metadata) {
            throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ");
        }

        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
}

const getReview = async (driverId) => {
    try {
        if (!driverId) {
            throw new Error("ID tài xế không hợp lệ");
        }

        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
            throw new Error("Người dùng chưa đăng nhập");
        }

        const response = await apiClient.get(`/review/${driverId}/driver`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );

        if (!response || !response.data || !response.data.metadata) {
            throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ");
        }

        return response.data.metadata;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response) {
            throw new Error('Có lỗi xảy ra từ phía server');
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
        } else {
            console.error('Lỗi:', error.message);
            throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
    }
}

export { signupApi, loginApi, updateDriver, updateLicenseDriver, acceptOrder, rejectOrder, confirmOrder, getInfoUser, giveOrder, getOrder, changeStatus, getReview };
