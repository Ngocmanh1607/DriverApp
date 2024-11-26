import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getInfoUser, getOrder } from '../api/driverApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import CardOrderScreen from '../components/CardOrderScreen';

const OrderScreen = () => {
    const [driverId, setDriverId] = useState(null);
    const [isReceivingOrders, setIsReceivingOrders] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState();
    useEffect(() => {
        const fetchDriverId = async () => {
            try {
                await getInfoUser();
                const id = await AsyncStorage.getItem('driverId');
                console.log("Fetched driverId from AsyncStorage:", id);
                setDriverId(id);
            } catch (error) {
                console.error("Lỗi khi lấy driverId:", error);
            }
        }
        fetchDriverId();
    }, []);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (driverId) {
                    const response = await getOrder(driverId);
                    console.log(response)
                    setOrders(response);
                }
                else {
                    console.log("chưa có driverID")
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchOrder();
    }, [driverId])
    const renderOrder = ({ item }) => <CardOrderScreen item={item} />;
    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderOrder}
                    ListEmptyComponent={<Text>No orders available</Text>}
                />
            )}
        </View>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
})