import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
const OrderDetailScreen = ({ route }) => {
    // const { item } = route.params;
    // const items = item.listCartItem
    console.log('Topping', items)
    const navigation = useNavigation()
    // Mock data for the order details
    const orderDetails = {
        driver: {
            name: 'Pham Trung Kien',
            rating: 5.0,
            vehicle: 'Yamaha | Nozza',
            licensePlate: '68T1-572.84',
            driverImage: 'https://link-to-driver-image.com/driver.jpg', // Replace with a real image
        },
        items: [
            {
                name: 'Mì Soyum bò Mỹ',
                price: 70000,
                quantity: 1,
                options: [
                    'Chọn cách chế biến I: Nấu Chín (Phí hộp đựng muỗng đũa)',
                    'Chọn cấp độ cay: Cấp 2',
                    'nhiều nước chấm muối ớt xanh'
                ],
                image: 'https://link-to-item-image.com/item1.jpg', // Replace with a real image
            },
            {
                name: 'Mì Kim chi bò Mỹ',
                price: 70000,
                quantity: 2,
                options: [
                    'Chọn cách chế biến I: Nấu Chín (Phí hộp đựng muỗng đũa)',
                    'Chọn cấp độ cay: Cấp 2'
                ],
                image: 'https://link-to-item-image.com/item2.jpg', // Replace with a real image
            },
        ],
        total: '93.000₫',
        paymentMethod: 'MoMo',
        orderId: '29270933',
        orderTime: '28/08/2024 | 19:20',
    };

    return (
        <ScrollView style={styles.container}>
            {/* Order ID */}
            <View style={styles.orderIdContainer}>
                <Text style={styles.orderId}>Mã đơn: {orderDetails.orderId}</Text>
                <Text style={styles.orderTime}>{orderDetails.orderTime}</Text>
            </View>
            {/* Driver Information */}
            <View style={styles.driverInfoContainer}>
                <Text style={styles.licensePlate}>{orderDetails.driver.licensePlate}</Text>
                <Text>{orderDetails.driver.vehicle}</Text>
                <View style={styles.driverDetails}>
                    <Image source={require('../access/Images/Shipper.webp')} style={styles.driverImage} />
                    <View style={styles.driverInfo}>
                        <Text style={styles.driverName}>{orderDetails.driver.name}</Text>
                        <Text style={styles.driverRating}>⭐ {orderDetails.driver.rating}</Text>
                    </View>
                </View>
            </View>

            {/* Ordered Items */}
            {items.map((item, index) => (
                <View key={index} style={styles.orderItemContainer}>
                    <View style={styles.orderItemDetails}>
                        <Image source={{ uri: item.image }} style={styles.orderItemImage} />
                        <View style={styles.orderItemText}>
                            <Text style={styles.orderItemName}>{item.name}</Text>
                            {
                                item.toppings.length > 0 && item.toppings.map((id, topping_name) => (
                                    <Text key={id} style={styles.orderItemOption}>{topping_name}</Text>
                                ))
                            }
                        </View>
                    </View>
                    <View style={styles.orderInfPay}>
                        <Text style={styles.orderInfPayText}>Số lượng: {item.quantity}</Text>
                        <Text style={styles.orderInfPayText}>{item.quantity * item.price} đ</Text>
                    </View>
                </View>
            ))}

            {/* Payment Information */}
            <View style={styles.paymentInfoContainer}>
                <Text style={styles.paymentMethod}>Trả qua {orderDetails.paymentMethod}</Text>
                <Text style={styles.orderTotal}>{orderDetails.total}</Text>
                <Text style={[styles.paymentText, { fontWeight: 'bold' }]}>Chi tiết thanh toán</Text>
                {/* Tạm tính */}
                <View style={[styles.paymentContainer, { marginTop: 10 }]}>
                    <Text style={styles.paymentText}>Tạm tính</Text>
                    <Text style={styles.paymentText}>210000 đ</Text>
                </View>
                {/* Giảm giá */}
                <View style={styles.paymentContainer}>
                    <Text style={styles.paymentText}>Giảm giá</Text>
                    <Text style={styles.paymentText}>21000 đ</Text>
                </View>
                {/* Tổng thu */}
                <View style={styles.paymentSumContainer}>
                    <Text style={[styles.paymentText, { fontWeight: 'bold' }]}>Tổng tính</Text>
                    <Text style={[styles.paymentText, { fontWeight: 'bold' }]}>189000 đ</Text>
                </View>
            </View>

            {/* Complete Button */}
            <TouchableOpacity style={styles.completeButton}>
                <Text style={styles.completeButtonText}>Hoàn thành</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    driverInfoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    licensePlate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    driverDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    driverImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    driverInfo: {
        marginLeft: 10,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    driverRating: {
        color: '#888',
    },
    orderItemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    orderItemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderItemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    orderItemText: {
        flex: 1,
    },
    orderItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    orderItemOption: {
        color: '#888',
        fontSize: 14,
    },
    orderInfPay: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    orderInfPayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    paymentInfoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,
    },
    orderIdContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderId: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    orderTime: {
        fontSize: 14,
        color: '#888',
    },
    paymentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    paymentSumContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#666',
        marginTop: 10,
        paddingTop: 10
    },
    completeButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    completeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    paymentText: {
        fontSize: 16,
        color: '#333'
    },
});