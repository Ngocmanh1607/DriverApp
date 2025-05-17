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
import styles from '../assets/css/OrderHisDetailStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OrderDetailScreen = ({route}) => {
  const {orderData} = route.params;

  const order = orderData || {};

  const items = order.listCartItem || [];

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
        return 'Giao hàng thành công';
      default:
        return status;
    }
  };

  const callCustomer = () => {
    if (order.phone_number) {
      const phoneNumber = order.phone_number;
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const getPaymentMethod = payMethod => {
    if (payMethod === '0' || !payMethod) {
      return 'Tiền mặt';
    } else {
      return payMethod;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Order Header - Status, ID and Date in one block */}
      <View style={styles.orderHeaderSection}>
        {/* Status */}
        {order.order_status && (
          <View
            style={[
              styles.statusContainer,
              {backgroundColor: getStatusColor(order.order_status)},
            ]}>
            <MaterialIcons
              name="check-circle"
              size={20}
              color="white"
              style={styles.statusIcon}
            />
            <Text style={styles.statusText}>
              {getStatusText(order.order_status)}
            </Text>
          </View>
        )}

        {/* Order ID and Date */}
        <View style={styles.orderInfoHeader}>
          <View style={styles.orderIdBox}>
            <MaterialIcons
              name="receipt"
              size={18}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.orderId}>Mã đơn: {order.order_id}</Text>
          </View>
          <View style={styles.orderDateBox}>
            <MaterialIcons
              name="event"
              size={18}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.orderTime}>
              {formatDate(order.order_created_at)}
            </Text>
          </View>
        </View>
      </View>

      {/* Customer Info - separate block */}
      <View style={styles.orderInfo}>
        {/* Customer Info */}
        <View style={styles.orderUser}>
          <View style={styles.customerInfoContainer}>
            <MaterialIcons
              name="person"
              size={18}
              color="#555"
              style={styles.icon}
            />
            <Text style={styles.orderId}>
              Người nhận: {order.customer_name || 'N/A'}
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
              {order.customer_phone || 'N/A'}
            </Text>
          </TouchableOpacity>
        </View>

        {order.address && (
          <View style={styles.addressContainer}>
            <MaterialIcons
              name="location-on"
              size={18}
              color="#FF5722"
              style={styles.icon}
            />
            <Text style={styles.addressText}>{order.address}</Text>
          </View>
        )}
      </View>

      {/* Restaurant Information */}
      <View style={styles.restaurantInfoContainer}>
        <Image source={{uri: order.image}} style={styles.restaurantImage} />
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>{order.name}</Text>
          <Text style={styles.restaurantDescription}>{order.description}</Text>
          {order.rating && (
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.restaurantRating}>{order.rating}</Text>
            </View>
          )}
        </View>
      </View>

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
                  {item.toppings &&
                    Array.isArray(item.toppings) &&
                    item.toppings.length > 0 &&
                    item.toppings[0] !== 'Array' && (
                      <View style={styles.toppingsContainer}>
                        {item.toppings.map((topping, toppingIndex) => (
                          <Text
                            key={toppingIndex}
                            style={styles.orderItemOption}>
                            +{' '}
                            {typeof topping === 'object'
                              ? topping.topping_name
                              : topping}
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
      {order.note && (
        <View style={styles.noteContainer}>
          <MaterialIcons
            name="note"
            size={18}
            color="#555"
            style={styles.icon}
          />
          <Text style={styles.noteText}>Ghi chú: {order.note}</Text>
        </View>
      )}

      {/* Coupons Section */}
      {order.coupons &&
        Array.isArray(order.coupons) &&
        order.coupons.length > 0 && (
          <View style={styles.couponsContainer}>
            <View style={styles.sectionHeaderContainer}>
              <MaterialIcons name="local-offer" size={20} color="#333" />
              <Text style={styles.sectionTitle}>Phiếu giảm giá</Text>
            </View>

            {order.coupons
              .filter(
                coupon =>
                  coupon.coupon_code &&
                  coupon.coupon_name &&
                  coupon.discount_value,
              )
              .map((coupon, index) => (
                <View key={index} style={styles.couponItem}>
                  <View style={styles.couponLeftSide}>
                    <Text style={styles.couponCode}>{coupon.coupon_code}</Text>
                    <Text style={styles.couponName}>{coupon.coupon_name}</Text>
                  </View>
                  <View style={styles.couponRightSide}>
                    <Text style={styles.couponValue}>
                      {coupon.discount_type === 'PERCENTAGE'
                        ? `-${coupon.discount_value}%`
                        : `-${formatPrice(coupon.discount_value)}`}
                    </Text>
                  </View>
                </View>
              ))}
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
            Trả qua {getPaymentMethod(order.order_pay)}
          </Text>
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.paymentText}>Tạm tính:</Text>
          <Text style={styles.paymentText}>
            {formatPrice(
              parseFloat(order.price) - parseFloat(order.delivery_fee || 0) ||
                0,
            )}
          </Text>
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.paymentText}>Phí giao hàng:</Text>
          <Text style={styles.paymentText}>
            {formatPrice(order.delivery_fee || 0)}
          </Text>
        </View>

        <View style={styles.paymentTotal}>
          <Text style={styles.paymentTotalText}>Tổng cộng</Text>
          <Text style={styles.paymentTotalText}>
            {formatPrice(order.price || 0)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreen;
