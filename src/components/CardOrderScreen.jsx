import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import formatTime, {formatDate} from '../utils/formatTime';
const CardOrderScreen = ({item}) => {
  const navigation = useNavigation();
  console.log(item);
  const handlePress = () => {
    navigation.navigate('OrderDetail', {ordersNew: item});
  };

  const calculateTotal = () => {
    if (!item.listCartItem || item.listCartItem.length === 0) return 0;
    return item.listCartItem.reduce((sum, cartItem) => {
      return sum + cartItem.price * cartItem.quantity;
    }, 0);
  };

  const formatPrice = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const getStatusInfo = () => {
    switch (item.order_status) {
      case 'PAID':
        return {
          color: '#FF0000',
          text: 'Đơn hàng mới',
          icon: 'bell-ring-outline',
        };
      case 'PREPARING_ORDER':
        return {color: '#FF9800', text: 'Đang chuẩn bị', icon: 'food-outline'};
      case 'ORDER_CANCELED':
        return {
          color: '#FF0000',
          text: 'Đơn bị hủy',
          icon: 'close-circle-outline',
        };
      case 'DELIVERING':
        return {
          color: '#2196F3',
          text: 'Đang giao hàng',
          icon: 'truck-delivery-outline',
        };
      case 'GIVED_ORDER':
      case 'GIVED ORDER':
        return {
          color: '#9C27B0',
          text: 'Đã giao cho shipper',
          icon: 'package-variant',
        };
      case 'ORDER_CONFIRMED':
        return {
          color: '#28a745',
          text: 'Đã giao xong',
          icon: 'check-circle-outline',
        };
      default:
        return {
          color: '#607D8B',
          text: item.order_status || 'Chưa xác định',
          icon: 'information-outline',
        };
    }
  };

  const {color, text, icon} = getStatusInfo();

  return (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={handlePress}
      activeOpacity={0.7}>
      <View style={styles.headerContainer}>
        <View style={styles.orderIdContainer}>
          <Icon name="receipt" size={18} color="#333" />
          <Text style={styles.orderId}>Đơn hàng #{item.id}</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Icon
            name="calendar"
            size={16}
            color="#666"
            style={styles.headerIcon}
          />
          <Text style={styles.orderDate}>{formatDate(item.order_date)}</Text>
          <Icon
            name="clock-outline"
            size={16}
            color="#666"
            style={[styles.headerIcon, {marginLeft: 8}]}
          />
          <Text style={styles.orderDate}>{formatTime(item.order_date)}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, {backgroundColor: `${color}20`}]}>
          <Icon name={icon} size={16} color={color} style={{marginRight: 4}} />
          <Text style={[styles.statusText, {color: color}]}>{text}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Tổng tiền:</Text>
          <Text style={styles.priceValue}>
            {formatPrice(calculateTotal())} đ
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoContainer}>
        <View style={styles.customerInfo}>
          <View style={styles.customerNameContainer}>
            <Icon
              name="account"
              size={18}
              color="#333"
              style={styles.infoIcon}
            />
            <Text style={styles.customerName}>{item.receiver_name}</Text>
          </View>
          <View style={styles.itemsContainer}>
            <Icon
              name="food-variant"
              size={16}
              color="#3498db"
              style={{marginRight: 4}}
            />
            <Text style={styles.itemsCount}>{item.listCartItem.length}</Text>
            <Text style={styles.itemsLabel}> món</Text>
          </View>
        </View>

        <View style={styles.contactContainer}>
          <Icon name="phone" size={16} color="#666" style={styles.infoIcon} />
          <Text style={styles.contactText}>
            {item.phone_number || 'Không có số điện thoại'}
          </Text>
        </View>

        <View style={styles.addressRow}>
          <Icon
            name="map-marker"
            size={18}
            color="#666"
            style={[styles.infoIcon, {alignSelf: 'flex-start', marginTop: 2}]}
          />
          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>Địa chỉ:</Text>
            <Text style={styles.addressText}>{item.address_receiver}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <View style={styles.orderMetaContainer}>
          {item.payment_method && (
            <View style={styles.paymentMethod}>
              <Icon
                name={item.payment_method === 'CASH' ? 'cash' : 'credit-card'}
                size={14}
                color="#555"
                style={{marginRight: 4}}
              />
              <Text style={styles.paymentText}>
                {item.payment_method === 'CASH'
                  ? 'Tiền mặt'
                  : 'Thanh toán online'}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.viewDetails}>
          <Text style={styles.viewDetailsText}>Xem chi tiết</Text>
          <Icon name="chevron-right" size={16} color="#2196F3" />
        </View>
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
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginLeft: 6,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#555',
    marginRight: 4,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#e53935',
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
  customerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 8,
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
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#444',
  },
  addressRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  addressContainer: {
    flex: 1,
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
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  orderMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  paymentText: {
    fontSize: 12,
    color: '#555',
  },
  viewDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
    marginRight: 4,
  },
});
