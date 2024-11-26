import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import formatPrice from '../utils/formatPrice';
const OrderDetailScreen = ({ route }) => {
    const { ordersNew } = route.params;
    const items = ordersNew.listCartItem
    const navigation = useNavigation()
    return (
        <ScrollView style={styles.container}>
            {/* Order ID */}
            <View style={styles.orderIdContainer}>
                <Text style={styles.orderId}>Mã đơn: {ordersNew.id}</Text>
                <Text style={styles.orderTime}>{ordersNew.order_date}</Text>
            </View>
            <View style={styles.orderUser}>
                <Text style={styles.orderId}>Người nhận: {ordersNew.receiver_name} - </Text>
                <Text style={styles.orderTime}>{ordersNew.phone_number}</Text>
            </View>
            {/* Res Information */}
            <View style={styles.driverInfoContainer}>
                <Image source={{ uri: ordersNew.Restaurant.image }} style={styles.driverImage} />
                <View style={styles.driverDetails}>
                    <Text style={styles.resDetail}>{ordersNew.Restaurant.name}</Text>
                    <Text style={styles.resDes}>{ordersNew.Restaurant.description}</Text>
                    <Text style={styles.driverRating}>⭐ {ordersNew.Restaurant.rating || 5}</Text>
                </View>
            </View>


            {/* Ordered Items */}
            {
                items.map((item, index) => (
                    <View key={index} style={styles.orderItemContainer}>
                        <View style={styles.orderItemDetails}>
                            <Image source={{ uri: item.image }} style={styles.orderItemImage} />
                            <View style={styles.orderItemText}>
                                <Text style={styles.orderItemName}>{item.name}</Text>
                                {
                                    item.toppings && item.toppings.length > 0 &&
                                    item.toppings.map((topping, toppingIndex) => (
                                        <Text key={toppingIndex} style={styles.orderItemOption}>
                                            {topping.topping_name}
                                        </Text>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={styles.orderInfPay}>
                            <Text style={styles.orderInfPayText}>Số lượng: {item.quantity}</Text>
                            <Text style={styles.orderInfPayText}>{formatPrice(item.price)}</Text>
                        </View>
                    </View>
                ))
            }
            {/* Note */}
            {
                ordersNew.note && (
                    <View style={styles.noteContainer}>
                        <Text>Ghi chú: {ordersNew.note}</Text>
                    </View>)
            }
            {/* Payment Information */}
            <View style={styles.paymentInfoContainer}>
                <Text style={styles.paymentMethod}>Trả qua {ordersNew.order_pay}</Text>
                {/* <Text style={[styles.paymentText, { fontWeight: 'bold' }]}>Chi tiết thanh toán</Text> */}
                {/* Tạm tính */}
                <View style={[styles.paymentContainer, { marginTop: 10 }]}>
                    <Text style={styles.paymentText}>Phí giao hàng:</Text>
                    <Text style={styles.paymentText}>{formatPrice(ordersNew.delivery_fee)}</Text>
                </View>
                {/* Giảm giá */}
                {/* <View style={styles.paymentContainer}>
                    <Text style={styles.paymentText}>Giảm giá</Text>
                    <Text style={styles.paymentText}>21000 đ</Text>
                </View> */}
                {/* Tổng thu */}
                <View style={styles.paymentSumContainer}>
                    <Text style={[styles.paymentText, { fontWeight: 'bold' }]}>Tổng tính</Text>
                    <Text style={[styles.paymentText, { fontWeight: 'bold' }]}>{formatPrice(ordersNew.price)}</Text>
                </View>
            </View>
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
        flexDirection: 'row'
    },
    resDetail: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    driverDetails: {
        marginLeft: 10,
    },
    driverImage: {
        width: 60,
        height: 60,
        borderRadius: 10
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
    orderUser: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
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