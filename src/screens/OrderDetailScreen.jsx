import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {formatPrice} from '../utils/formatPrice';
import {formatDate} from '../utils/format';
import styles from '../assets/css/OrderDetailStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OrderDetailScreen = ({route}) => {
  const {ordersNew} = route.params;
  const items = ordersNew.listCartItem || [];

  const getStatusColor = status => {
    switch (status) {
      case 'PAID':
        return '#4CAF50'; // Green
      case 'UNPAID':
        return '#757575'; // Gray
      case 'PREPARING_ORDER':
        return '#FF9800'; // Orange
      case 'ORDER_CANCELED':
        return '#F44336'; // Red
      case 'ORDER_RECEIVED':
        return '#2196F3'; // Blue
      case 'DELIVERING':
        return '#03A9F4'; // Light Blue
      case 'ORDER_CONFIRMED':
        return '#4CAF50'; // Green
      default:
        return '#757575'; // Gray
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'PAID':
        return 'Đã thanh toán';
      case 'UNPAID':
        return 'Chưa thanh toán';
      case 'PREPARING_ORDER':
        return 'Đang chuẩn bị';
      case 'ORDER_CANCELED':
        return 'Đã hủy';
      case 'ORDER_RECEIVED':
        return 'Đã nhận đơn';
      case 'DELIVERING':
        return 'Đang giao hàng';
      case 'ORDER_CONFIRMED':
        return 'Đã xác nhận';
      default:
        return status;
    }
  };

  const callCustomer = () => {
    if (ordersNew.phone_number) {
      Linking.openURL(`tel:${ordersNew.phone_number}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Order Status */}
      {ordersNew.order_status && (
        <View
          style={[
            styles.statusContainer,
            {backgroundColor: getStatusColor(ordersNew.order_status)},
          ]}>
          <Text style={styles.statusText}>
            {getStatusText(ordersNew.order_status)}
          </Text>
        </View>
      )}

      {/* Order ID and Customer Info */}
      <View style={styles.orderInfo}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>Mã đơn: {ordersNew.id}</Text>
          <Text style={styles.orderTime}>
            {formatDate(ordersNew.order_date)}
          </Text>
        </View>

        <View style={styles.orderUser}>
          <View style={styles.customerInfoContainer}>
            <MaterialIcons
              name="person"
              size={18}
              color="#555"
              style={styles.icon}
            />
            <Text style={styles.orderId}>
              Người nhận: {ordersNew.receiver_name || 'N/A'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={callCustomer}
            style={styles.phoneContainer}>
            <FontAwesome
              name="phone"
              size={18}
              color="#4CAF50"
              style={styles.icon}
            />
            <Text style={styles.orderTime}>
              {ordersNew.phone_number || 'N/A'}
            </Text>
          </TouchableOpacity>
        </View>

        {ordersNew.address_receiver && (
          <View style={styles.addressContainer}>
            <MaterialIcons
              name="location-on"
              size={18}
              color="#FF5722"
              style={styles.icon}
            />
            <Text style={styles.addressText}>{ordersNew.address_receiver}</Text>
          </View>
        )}
      </View>

      {/* Restaurant Information */}
      {ordersNew.Restaurant && (
        <View style={styles.restaurantInfoContainer}>
          <Image
            source={{uri: ordersNew.Restaurant.image}}
            style={styles.restaurantImage}
          />
          <View style={styles.restaurantDetails}>
            <Text style={styles.restaurantName}>
              {ordersNew.Restaurant.name}
            </Text>
            <Text style={styles.restaurantDescription}>
              {ordersNew.Restaurant.description}
            </Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.restaurantRating}>
                {ordersNew.Restaurant.rating || 5}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Section Title for Items */}
      <View style={styles.sectionHeaderContainer}>
        <MaterialIcons name="shopping-bag" size={20} color="#333" />
        <Text style={styles.sectionTitle}>Đơn hàng của bạn</Text>
      </View>

      {/* Ordered Items */}
      <View style={styles.orderItemsWrapper}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <View
              key={index}
              style={[
                styles.orderItemContainer,
                index === items.length - 1 ? styles.lastItemNoBorder : null,
              ]}>
              <View style={styles.orderItemDetails}>
                <Image
                  source={{uri: item.image}}
                  style={styles.orderItemImage}
                />
                <View style={styles.orderItemText}>
                  <Text style={styles.orderItemName}>{item.name}</Text>
                  {item.toppings && item.toppings.length > 0 && (
                    <View style={styles.toppingsContainer}>
                      {item.toppings.map((topping, toppingIndex) => (
                        <Text key={toppingIndex} style={styles.orderItemOption}>
                          + {topping.topping_name}
                        </Text>
                      ))}
                    </View>
                  )}
                  <View style={styles.orderItemInfo}>
                    <View style={styles.quantityContainer}>
                      <Text style={styles.quantityLabel}>Số lượng:</Text>
                      <Text style={styles.quantityValue}>{item.quantity}</Text>
                    </View>
                    <Text style={styles.orderItemPrice}>
                      {formatPrice(item.price)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.itemTotalContainer}>
                <Text style={styles.itemTotalLabel}>Thành tiền:</Text>
                <Text style={styles.itemTotalValue}>
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyItemsContainer}>
            <MaterialIcons name="shopping-cart" size={40} color="#ccc" />
            <Text style={styles.emptyItemsText}>Không có món hàng nào</Text>
          </View>
        )}
      </View>

      {/* Note */}
      {ordersNew.note && (
        <View style={styles.noteContainer}>
          <MaterialIcons
            name="note"
            size={18}
            color="#555"
            style={styles.icon}
          />
          <Text style={styles.noteText}>Ghi chú: {ordersNew.note}</Text>
        </View>
      )}

      {/* Payment Information */}
      <View style={styles.paymentInfoContainer}>
        <View style={styles.paymentHeaderRow}>
          <MaterialIcons
            name="payment"
            size={18}
            color="#555"
            style={styles.icon}
          />
          <Text style={styles.paymentMethod}>
            Trả qua {ordersNew.order_pay || 'Tiền mặt'}
          </Text>
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.paymentText}>Tạm tính:</Text>
          <Text style={styles.paymentText}>
            {formatPrice(
              parseFloat(ordersNew.price) -
                parseFloat(ordersNew.delivery_fee || 0) || 0,
            )}
          </Text>
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.paymentText}>Phí giao hàng:</Text>
          <Text style={styles.paymentText}>
            {formatPrice(ordersNew.delivery_fee || 0)}
          </Text>
        </View>

        <View style={styles.paymentTotal}>
          <Text style={styles.paymentTotalText}>Tổng cộng</Text>
          <Text style={styles.paymentTotalText}>
            {formatPrice(ordersNew.price || 0)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreen;
