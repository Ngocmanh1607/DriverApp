import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import formatPrice from '../utils/formatPrice';
import styles from '../access/css/OrderDetailStyle';
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