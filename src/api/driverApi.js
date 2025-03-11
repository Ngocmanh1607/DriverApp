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
        const { message, metadata } = response.data;
        if (!message) {
            console.error('Error message:', message);
            return;
        }

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
        if (error.response) {
            console.error("Lỗi từ server:", error.response.data);
            const serverError = error.response.data?.message || "Có lỗi xảy ra từ phía server.";
            throw new Error(serverError);
        } else if (error.request) {
            throw new Error("Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối mạng.");
        } else {
            console.error("Lỗi không xác định:", error.message);
            throw new Error("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
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
            console.error('Error message:', message);
            return; // Or throw an error
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
        console.error("Login failed:", error);
        throw error;
    }
};
const updateDriver = async (driver) => {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken)
    if (!userId || !accessToken) {
        throw new Error("User not logged in");
    }
    try {
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
        return response.data.metadata;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const updateLicenseDriver = async (info) => {
    console.log(info);
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken)
    if (!userId || !accessToken) {
        throw new Error("User not logged in");
    }
    try {
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
        return response.data.metadata;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const acceptOrder = async (orderId) => {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken)
    if (!userId || !accessToken) {
        throw new Error("User not logged in");
    }
    try {
        const response = await apiClient.get(`driver/accept/${orderId}`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );
        console.log(response.data.metadata)
        return response.data.metadata;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const rejectOrder = async (orderId) => {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken)
    if (!userId || !accessToken) {
        throw new Error("User not logged in");
    }
    try {
        const response = await apiClient.get(`/driver/reject/${orderId}`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );
        console.log(response.data.metadata)
        return response.data.metadata;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const confirmOrder = async (orderId) => {
    console.log(orderId)
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken)
    if (!userId || !accessToken) {
        throw new Error("User not logged in");
    }
    try {
        const response = await apiClient.get(`/driver/confirm/${orderId}`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );
        console.log(response.data.metadata)
        return response.data.metadata;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const getInfoUser = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!userId || !accessToken) {
        throw new Error("User not logged in");
    }
    try {
        const response = await apiClient.get(`/driver/detail`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );
        await AsyncStorage.setItem('driverId', response.data.metadata.Driver.id.toString())
        return response.data.metadata;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw new Error('Failed to fetch user info');
    }
}
const giveOrder = async (orderId) => {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!userId || !accessToken) {
        throw new Error("User not logged in");
    }
    try {
        const response = await apiClient.get(`/driver/give/${orderId}`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );
        return response.data.metadata;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw new Error('Failed to fetch user info');
    }
}
const getOrder = async (driverId) => {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!userId || !accessToken) {
        throw new Error("User not logged in");
    }
    try {
        const response = await apiClient.get(`/driver/${driverId}/order`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );
        return response.data.metadata;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw new Error('Failed to fetch user info');
    }
}
const changeStatus = async (driver_id) => {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!userId || !accessToken) {
        throw new Error("User not logged in");
    }
    try {
        const response = await apiClient.put(`/driver/${driver_id}`,
            {

            },
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );
        return response.data.metadata;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw new Error('Failed to fetch user info');
    }
}

const getReview = async (driverId) => {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!userId || !accessToken) {
        throw new Error("User not logged in");
    }
    try {
        const response = await apiClient.get(`/review/${driverId}/driver`,
            {
                headers: {
                    "x-api-key": apiKey,
                    "authorization": accessToken,
                    "x-client-id": userId,
                }
            }
        );
        return response.data.metadata;
    } catch {
        console.error('Error fetching user info:', error);
        throw new Error('Failed to fetch user info');
    }
}
export { signupApi, loginApi, updateDriver, updateLicenseDriver, acceptOrder, rejectOrder, confirmOrder, getInfoUser, giveOrder, getOrder, changeStatus, getReview };
