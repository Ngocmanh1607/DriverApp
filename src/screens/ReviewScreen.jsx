import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useMemo, useState, useEffect} from 'react';
import styles from '../assets/css/ReviewStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import ReviewItem from '../components/ReviewItem';
import {getReview, getInfoUser} from '../api/driverApi';
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
  const {ratingsData, totalReviews, averageRating} = useMemo(() => {
    const ratings = [0, 0, 0, 0, 0];
    let total = reviews?.length || 0;
    let sumRatings = 0;

    reviews?.forEach(({dri_rating}) => {
      ratings[dri_rating - 1]++;
      sumRatings += dri_rating;
    });

    return {
      ratingsData: ratings
        .map((count, index) => ({
          stars: index + 1,
          count,
          percentage: total > 0 ? (count / total) * 100 : 0,
        }))
        .reverse(), // Đảo ngược để hiển thị từ 5→1
      totalReviews: total,
      averageRating: (sumRatings / total).toFixed(1),
    };
  }, [reviews]);
  const renderRatingSummary = () => (
    <View style={styles.ratingCard}>
      <View style={styles.ratingOverview}>
        <View style={styles.averageRatingContainer}>
          <Text style={styles.averageRatingValue}>{averageRating}</Text>
          <View style={styles.starsRow}>
            {[...Array(5)].map((_, index) => (
              <FontAwesome
                key={index}
                name="star"
                size={16}
                color={
                  index < Math.round(parseFloat(averageRating))
                    ? '#FFD700'
                    : '#DDDDDD'
                }
                style={styles.starIcon}
              />
            ))}
          </View>
          <Text style={styles.totalReviewsText}>{totalReviews} đánh giá</Text>
        </View>

        <View style={styles.ratingBreakdown}>
          {ratingsData.map(item => (
            <View key={item.stars} style={styles.ratingRow}>
              <View style={styles.starsLabel}>
                <Text style={styles.starText}>{item.stars}</Text>
                <FontAwesome
                  name="star"
                  size={12}
                  color="#FFD700"
                  style={styles.starIconSmall}
                />
              </View>

              <View style={styles.progressBarContainer}>
                <Progress.Bar
                  progress={item.count / totalReviews || 0}
                  width={null}
                  height={8}
                  color="#FFD700"
                  unfilledColor="#EEEEEE"
                  borderWidth={0}
                  style={styles.progressBar}
                />
              </View>

              <View style={styles.countContainer}>
                <Text style={styles.countText}>{item.count}</Text>
                <Text style={styles.percentageText}>
                  {totalReviews > 0 ? Math.round(item.percentage) : 0}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Chưa có đánh giá nào</Text>
    </View>
  );

  const renderReviewsList = () => (
    <FlatList
      data={reviews}
      renderItem={({item}) => <ReviewItem review={item} />}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.reviewsList}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={renderRatingSummary}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF3B30" />
          <Text style={styles.loadingText}>Đang tải đánh giá...</Text>
        </View>
      ) : reviews?.length > 0 ? (
        renderReviewsList()
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
};
export default ReviewScreen;
