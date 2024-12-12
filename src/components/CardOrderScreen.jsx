import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CardOrderScreen = ({ item }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        // navigation.navigate('OrderDetail', { ordersNew: item })
    }
    return (
        <TouchableOpacity style={styles.orderInfo} onPress={() => handlePress()}>
            <View style={styles.orderInfoContainer}>
                <Text style={styles.orderId}>Đơn hàng số {item.id}</Text>
                <Text> {(item.createdAt.split("T")[0])}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={styles.orderName}>{item.receiver_name} - </Text>
                <Text style={styles.orderItems}>{item.listCartItem.length} món</Text></View>
            <Text style={styles.orderAddress}>{item.address_receiver}</Text>
        </TouchableOpacity>
    )
}

export default CardOrderScreen

const styles = StyleSheet.create({
    orderInfo: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,

    },
    orderInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    orderName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    orderItems: { color: '#333' },
    orderAddress: {
        fontSize: 14,
        color: '#A0A0A0'
    },
})