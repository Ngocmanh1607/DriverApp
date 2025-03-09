import axios from 'axios';

// API để tạo review mới
export const createReview = async (orderId, reviewData) => {
    try {
        const response = await axios.post(`/review/${orderId}`, reviewData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// API để lấy reviews của tài xế
export const getDriverReviews = async (driverId) => {
    try {
        const response = await axios.get(`/review/${driverId}/driver`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// API để lấy reviews của nhà hàng
export const getRestaurantReviews = async (restaurantId) => {
    try {
        const response = await axios.get(`/review/${restaurantId}/restaurant`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 