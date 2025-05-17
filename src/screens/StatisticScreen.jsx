import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LineChart} from 'react-native-chart-kit';
import StatisticCard from '../components/StatisticCard';
import {formatPrice} from '../utils/formatPrice';
import {
  checkDateInCurrentWeek,
  checkDateInMonth,
  getWeekOfMonth,
} from '../utils/utilsTime';
import styles from '../assets/css/StatisticStyle';
import {getInfoUser, getOrder} from '../api/driverApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getReview} from '../api/driverApi';
const StatisticScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [driverId, setDriverId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalEarnings: 0,
    dailyData: {
      labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      earnings: Array(7).fill(0),
      orders: Array(7).fill(0),
    },
    weeklyData: {
      labels: ['T1', 'T2', 'T3', 'T4', ''],
      earnings: Array(5).fill(0),
      orders: Array(5).fill(0),
    },
    monthlyData: {
      labels: [
        'T1',
        'T2',
        'T3',
        'T4',
        'T5',
        'T6',
        'T7',
        'T8',
        'T9',
        'T10',
        'T11',
        'T12',
      ],
      earnings: Array(12).fill(0),
      orders: Array(12).fill(0),
    },
  });
  const calculateStatistics = () => {
    const stats = {
      totalEarnings: 0,
      totalOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      dailyData: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        earnings: Array(7).fill(0),
        orders: Array(7).fill(0),
      },
      weeklyData: {
        labels: ['T1', 'T2', 'T3', 'T4', ''],
        earnings: Array(5).fill(0),
        orders: Array(5).fill(0),
      },
      monthlyData: {
        labels: [
          'T1',
          'T2',
          'T3',
          'T4',
          'T5',
          'T6',
          'T7',
          'T8',
          'T9',
          'T10',
          'T11',
          'T12',
        ],
        earnings: Array(12).fill(0),
        orders: Array(12).fill(0),
      },
    };
    if (selectedPeriod === 'day') {
      const today = new Date();
      const currentDay = today.getDate();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      orders.forEach(order => {
        const orderDate = new Date(order.order_created_at);
        if (
          orderDate.getDate() === currentDay &&
          orderDate.getMonth() === currentMonth &&
          orderDate.getFullYear() === currentYear
        ) {
          if (order.order_status === 'ORDER_CONFIRMED') {
            stats.totalEarnings += parseFloat(order.delivery_fee.toString());
            stats.completedOrders++;
          } else if (order.order_status === 'ORDER_CANCELLED') {
            stats.cancelledOrders++;
          }
          stats.totalOrders++;
        }
        if (checkDateInCurrentWeek(order.order_created_at)) {
          if (order.order_status === 'ORDER_CONFIRMED') {
            const dayOrder = new Date(order.order_created_at).getDay();
            stats.dailyData.earnings[dayOrder - 1] += parseFloat(
              order.delivery_fee.toString(),
            );
            stats.dailyData.orders[dayOrder - 1]++;
          }
        }
      });
      return stats;
    } else if (selectedPeriod === 'week') {
      orders.forEach(order => {
        if (checkDateInCurrentWeek(order.order_created_at)) {
          if (order.order_status === 'ORDER_CONFIRMED') {
            stats.totalEarnings += parseFloat(order.delivery_fee.toString());
            stats.completedOrders++;
          } else if (order.order_status === 'ORDER_CANCELLED') {
            stats.cancelledOrders++;
          }
          stats.totalOrders++;
        }
        if (checkDateInMonth(order.order_created_at)) {
          if (order.order_status === 'ORDER_CONFIRMED') {
            const dayOfWeek = getWeekOfMonth(order.order_created_at);
            stats.weeklyData.earnings[dayOfWeek] += parseFloat(
              order.delivery_fee.toString(),
            );
            stats.weeklyData.orders[dayOfWeek]++;
          }
        }
      });
      return stats;
    } else if (selectedPeriod === 'month') {
      orders.forEach(order => {
        if (checkDateInMonth(order.order_created_at)) {
          if (order.order_status === 'ORDER_CONFIRMED') {
            stats.totalEarnings += parseFloat(order.delivery_fee.toString());
            stats.completedOrders++;
          } else if (order.order_status === 'ORDER_CANCELLED') {
            stats.cancelledOrders++;
          }
          stats.totalOrders++;
        }
        const orderDate = new Date(order.order_created_at);
        const currentYear = new Date().getFullYear();
        const month = orderDate.getMonth(); // Lấy tháng (0 - 11)
        if (
          order.order_status === 'ORDER_CONFIRMED' &&
          orderDate.getFullYear() === currentYear
        ) {
          stats.monthlyData.earnings[month] += parseFloat(
            order.delivery_fee.toString(),
          );
          stats.monthlyData.orders[month]++;
        }
      });
      return stats;
    }
  };
  // get order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrder(driverId);
        console.log(response);
        setOrders(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
    const newStats = calculateStatistics();
    setStatistics(newStats);
  }, [driverId]);
  //get driver ID
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
  // get review
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        if (driverId) {
          const response = await getReview(driverId);
          const avg =
            response.reduce((sum, review) => sum + review.dri_rating, 0) /
            response.length;
          setAverageRating(avg.toFixed(1));
        }
      } catch (error) {
        console.error('Lỗi khi lấy đánh giá:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [driverId]);
  useEffect(() => {
    const newStats = calculateStatistics();
    setStatistics(newStats);
  }, [orders, selectedPeriod]);
  const renderChart = () => {
    let data, labels;
    const chartConfig = {
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
      strokeWidth: 2,
      barPercentage: 0.5,
    };
    switch (selectedPeriod) {
      case 'day':
        data = statistics.dailyData;
        labels = statistics.dailyData.labels;
        break;
      case 'week':
        data = statistics.weeklyData;
        labels = statistics.weeklyData.labels;
        break;
      case 'month':
        data = statistics.monthlyData;
        labels = statistics.monthlyData.labels;
        break;
      default:
        data = statistics.dailyData;
        labels = statistics.dailyData.labels;
        break;
    }
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Biểu đồ thu nhập</Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data.earnings.map(val => val / 1000),
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
    );
  };
  const handlePeriodChange = period => {
    setSelectedPeriod(period);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.periodContainer}>
            <TouchableOpacity
              style={[
                styles.periodButton,
                selectedPeriod === 'day' && styles.periodButtonActive,
              ]}
              onPress={() => handlePeriodChange('day')}>
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === 'day' && styles.periodButtonTextActive,
                ]}>
                Ngày
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodButton,
                selectedPeriod === 'week' && styles.periodButtonActive,
              ]}
              onPress={() => handlePeriodChange('week')}>
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === 'week' && styles.periodButtonTextActive,
                ]}>
                Tuần
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodButton,
                selectedPeriod === 'month' && styles.periodButtonActive,
              ]}
              onPress={() => handlePeriodChange('month')}>
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === 'month' && styles.periodButtonTextActive,
                ]}>
                Tháng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.statsGrid}>
          <StatisticCard
            title="Tổng thu nhập"
            value={formatPrice(statistics.totalEarnings)}
            icon="account-balance-wallet"
            color="#5196F4"
          />
          <StatisticCard
            title="Tổng đơn hàng"
            value={statistics.totalOrders}
            icon="shopping-bag"
            color="#2ECC71"
          />
          <StatisticCard
            title="Đơn hoàn thành"
            value={statistics.completedOrders}
            icon="check-circle"
            color="#27AE60"
          />
          <StatisticCard
            title="Đơn hủy"
            value={statistics.cancelledOrders}
            icon="cancel"
            color="#E74C3C"
          />
        </View>

        {renderChart()}

        <View style={styles.orderStatsContainer}>
          <Text style={styles.orderStatsTitle}>Chi tiết đơn hàng</Text>
          <View style={styles.orderStats}>
            <View style={styles.orderStatItem}>
              <Text style={styles.orderStatLabel}>Tỷ lệ hoàn thành</Text>
              <Text style={styles.orderStatValue}>
                {statistics.totalOrders > 0
                  ? `${((statistics.completedOrders / statistics.totalOrders) * 100).toFixed(1)}%`
                  : '100%'}
              </Text>
            </View>
            <View style={styles.orderStatItem}>
              <Text style={styles.orderStatLabel}>Đánh giá trung bình</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={20} color="#FFC107" />
                <Text style={styles.orderStatValue}>{averageRating}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default StatisticScreen;
