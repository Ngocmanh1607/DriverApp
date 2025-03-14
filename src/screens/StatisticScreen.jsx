import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import StatisticCard from '../components/StatisticCard';
import { formatPrice } from '../utils/formatPrice';
import styles from '../assets/css/StatisticStyle';
const StatisticScreen = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const statistics = {
        totalOrders: 150,
        completedOrders: 142,
        cancelledOrders: 8,
        totalEarnings: 15000000,
        averageRating: 4.8,
        weeklyData: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            earnings: [500000, 700000, 600000, 800000, 1000000, 1200000, 900000],
            orders: [5, 7, 6, 8, 10, 12, 9],
        },
    };


    const renderChart = () => {
        const chartConfig = {
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
        };

        return (
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Biểu đồ thu nhập</Text>
                <LineChart
                    data={{
                        labels: statistics.weeklyData.labels,
                        datasets: [
                            {
                                data: statistics.weeklyData.earnings.map(val => val / 100000), // Chia để hiển thị đẹp hơn
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


    const PeriodSelector = () => (
        <View style={styles.periodContainer}>
            <TouchableOpacity
                style={[
                    styles.periodButton,
                    selectedPeriod === 'week' && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod('week')}
            >
                <Text
                    style={[
                        styles.periodButtonText,
                        selectedPeriod === 'week' && styles.periodButtonTextActive,
                    ]}
                >
                    Tuần
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.periodButton,
                    selectedPeriod === 'month' && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod('month')}
            >
                <Text
                    style={[
                        styles.periodButtonText,
                        selectedPeriod === 'month' && styles.periodButtonTextActive,
                    ]}
                >
                    Tháng
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.periodButton,
                    selectedPeriod === 'year' && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod('year')}
            >
                <Text
                    style={[
                        styles.periodButtonText,
                        selectedPeriod === 'year' && styles.periodButtonTextActive,
                    ]}
                >
                    Năm
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <PeriodSelector />
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
                                {((statistics.completedOrders / statistics.totalOrders) * 100).toFixed(1)}%
                            </Text>
                        </View>
                        <View style={styles.orderStatItem}>
                            <Text style={styles.orderStatLabel}>Đánh giá trung bình</Text>
                            <View style={styles.ratingContainer}>
                                <Icon name="star" size={20} color="#FFC107" />
                                <Text style={styles.orderStatValue}>{statistics.averageRating}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default StatisticScreen;