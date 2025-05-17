import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getInfoUser, getOrder} from '../api/driverApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import CardOrderScreen from '../components/CardOrderScreen';

const OrderScreen = () => {
  const [driverId, setDriverId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchDriverId = async () => {
      try {
        await getInfoUser();
        const id = await AsyncStorage.getItem('driverId');
        setDriverId(id);
      } catch (error) {
        console.error('Lỗi khi lấy driverId:', error);
      }
    };
    fetchDriverId();
  }, []);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (driverId) {
          const response = await getOrder(driverId);
          setOrders(response.slice().reverse());
        } else {
          console.log('chưa có driverID');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [driverId]);
  const renderOrder = ({item}) => <CardOrderScreen item={item} />;
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.order_id.toString()}
          renderItem={renderOrder}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Chưa có đơn hàng</Text>
          }
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
