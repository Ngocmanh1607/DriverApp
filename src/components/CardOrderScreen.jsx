import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CardOrderScreen = ({item}) => {
  const navigation = useNavigation();
  console.log(item);

  const handlePress = () => {
    navigation.navigate('OrderDetail', {ordersNew: item});
  };

  // Format date to be more readable
  const formatDate = dateString => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={handlePress}
      activeOpacity={0.7}>
      <View style={styles.headerContainer}>
        <Text style={styles.orderId}>Đơn hàng số {item.id}</Text>
        <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoContainer}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.receiver_name}</Text>
          <View style={styles.itemsContainer}>
            <Text style={styles.itemsCount}>{item.listCartItem.length}</Text>
            <Text style={styles.itemsLabel}> món</Text>
          </View>
        </View>

        <Text style={styles.addressLabel}>Địa chỉ:</Text>
        <Text style={styles.addressText}>{item.address_receiver}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardOrderScreen;

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  infoContainer: {
    marginTop: 6,
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  itemsCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3498db',
  },
  itemsLabel: {
    fontSize: 14,
    color: '#555',
  },
  addressLabel: {
    fontSize: 13,
    color: '#777',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
