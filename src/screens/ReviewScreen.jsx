import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import styles from '../access/css/ReviewStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import ReviewItem from '../components/ReviewItem';
const ReviewScreen = () => {
        const sampleReview = [
            { id: 0, user: 'Ngọc Mạnh', date: '17:33 12/02/2025', rating: 5, text: 'Ngon vl' },
            { id: 1, user: 'Thanh Tịnh', date: '17:33 12/02/2025', rating: 4, text: 'Tạm tạm' },
            { id: 2, user: 'Mai Nhung', date: '13:24 27/10/2024', rating: 5, text: 'Đồ ăn ngon lắm' },
            { id: 3, user: 'Uyên Thi', date: '15:20 11/02/2025', rating: 5, text: 'Tuyệt vời ông mặt trời' },
            { id: 4, user: 'Phương Linh', date: '10:12 05/01/2025', rating: 3, text: 'Bình thường' },
            { id: 5, user: 'Minh Khoa', date: '21:45 30/12/2024', rating: 2, text: 'Phục vụ chậm' },
            { id: 6, user: 'Bảo Trâm', date: '08:30 20/12/2024', rating: 1, text: 'Không ngon' },
        ];
        // Tính toán dữ liệu đánh giá
        const { ratingsData, totalReviews, averageRating } = useMemo(() => {
            const ratings = [0, 0, 0, 0, 0];
            let total = sampleReview.length;
            let sumRatings = 0;
            
            sampleReview.forEach(({ rating }) => {
                    ratings[rating - 1]++;
                    sumRatings += rating;
            });
    
            return {
                ratingsData: ratings.map((count, index) => ({
                    stars: index + 1,
                    count,
                })).reverse(), // Đảo ngược để hiển thị từ 5→1
                totalReviews: total,
                averageRating: (sumRatings / total).toFixed(1),
            };
        }, [sampleReview]);
    
        return (
            <View style={styles.container}>
                {/* Header hiển thị đánh giá trung bình */}
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
    
                {/* Danh sách bình luận */}
                <FlatList 
                    data={sampleReview}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    };
export default ReviewScreen;