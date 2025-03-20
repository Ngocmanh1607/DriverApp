import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import styles from '../assets/css/ReviewStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import ReviewItem from '../components/ReviewItem';
import { getReview, getInfoUser } from '../api/driverApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ReviewScreen = () => {
    const [reviews, setReviews] = useState([]);
    const [driverId, setDriverId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchDriverId = async () => {
            try {
                setIsLoading(true);
                await getInfoUser();
                const id = await AsyncStorage.getItem('driverId');
                setDriverId(id);
            } catch (error) {
                console.error('Error fetching driver ID:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDriverId();
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true);
            try {
                if (driverId) {
                    const response = await getReview(driverId);
                    console.log(response);
                    setReviews(response);
                }
            } catch (error) {
                console.error('Lỗi khi lấy đánh giá:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, [driverId]);
    // Tính toán dữ liệu đánh giá
    const { ratingsData, totalReviews, averageRating } = useMemo(() => {
        const ratings = [0, 0, 0, 0, 0];
        let total = reviews?.length || 0;
        let sumRatings = 0;

        reviews?.forEach(({ dri_rating }) => {
            ratings[dri_rating - 1]++;
            sumRatings += dri_rating;
        });

        return {
            ratingsData: ratings.map((count, index) => ({
                stars: index + 1,
                count,
            })).reverse(), // Đảo ngược để hiển thị từ 5→1
            totalReviews: total,
            averageRating: (sumRatings / total).toFixed(1),
        };
    }, [reviews]);
    return (
        <View style={styles.container}>
            {isLoading ? <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='red' />
            </View> :
                reviews?.length > 0 ?
                    <>
                        <View style={styles.headerContainer}>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.averageRating}>{averageRating}</Text>
                                <View style={styles.starsRow}>
                                    {[...Array(5)].map((_, index) => (
                                        <FontAwesome key={index} name="star" size={20} color="gold" />
                                    ))}
                                </View>
                                <Text style={styles.totalReviews}>{totalReviews} đánh giá</Text>
                            </View>

                            {/* Biểu đồ đánh giá */}
                            <View style={styles.ratingList}>
                                {ratingsData.map((item) => (
                                    <View key={item.stars} style={styles.ratingRow}>
                                        <Text style={styles.starText}>{item.stars} <FontAwesome name="star" size={14} color="gold" /></Text>
                                        <Progress.Bar
                                            progress={item.count / totalReviews}
                                            width={150}
                                            height={8}
                                            color="gold"
                                            unfilledColor="#ddd"
                                            borderWidth={0}
                                        />
                                        <Text style={styles.countText}>{item.count}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <FlatList
                            data={reviews}
                            renderItem={({ item }) => <ReviewItem review={item} />}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </> :
                    <View style={styles.noReviewsContainer}>
                        <Text style={styles.noReviewsText}>Không có đánh giá nào</Text>
                    </View>
            }
        </View>
    );
};
export default ReviewScreen;