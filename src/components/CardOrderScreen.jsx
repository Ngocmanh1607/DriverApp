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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={styles.orderName}>{item.receiver_name} </Text>
                <Text style={styles.orderItems}>{item.listCartItem.length} món</Text></View>
            <Text style={styles.orderAddress}>{item.address_receiver}</Text>
        </TouchableOpacity>
    )
}

export default CardOrderScreen

const styles = StyleSheet.create({
    orderInfo: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        marginBottom: 10,
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    orderDate: {
        fontSize: 14,
        color: '#777',
    },
    orderName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    orderItems: {
        fontSize: 14,
        color: '#555',
    },
    orderAddress: {
        marginTop: 4,
        fontSize: 14,
        color: '#888',
    },
});