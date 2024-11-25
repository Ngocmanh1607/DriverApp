import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiClient";
import fetchFcmToken from "../utils/fcmToken";
const apiKey = '123';
const signupApi = async (email, password) => {
    // const fcmToken = await fetchFcmToken();
    const fcmToken = 1
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
        AsyncStorage.setItem('driverId', response.data.metadata.Driver.id.toString())
        return response.data.metadata;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw new Error('Failed to fetch user info');
    }
}

export { signupApi, loginApi, updateDriver, updateLicenseDriver, acceptOrder, rejectOrder, confirmOrder, getInfoUser };
