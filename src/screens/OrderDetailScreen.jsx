import {Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {formatPrice} from '../utils/formatPrice';
import styles from '../assets/css/OrderDetailStyle';
import {formatDate} from '../utils/format';

const OrderDetailScreen = ({route}) => {
  const {ordersNew} = route.params;
  const items = ordersNew.listCartItem || [];
  console.log(ordersNew);
  return (
    <ScrollView style={styles.container}>
      {/* Order ID */}
      <View style={styles.orderInfo}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>Mã đơn: {ordersNew.id}</Text>
          <Text style={styles.orderTime}>
            {formatDate(ordersNew.order_date)}
          </Text>
        </View>
        <View style={styles.orderUser}>
          <Text style={styles.orderId}>
            Người nhận: {ordersNew.receiver_name || 'N/A'} -
          </Text>
          <Text style={styles.orderTime}>
            {ordersNew.phone_number || 'N/A'}
          </Text>
        </View>
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
            <Text style={styles.restaurantRating}>
              ⭐ {ordersNew.Restaurant.rating || 5}
            </Text>
          </View>
        </View>
      )}

      {/* Ordered Items */}
      {items.map((item, index) => (
        <View key={index} style={styles.orderItemContainer}>
          <View style={styles.orderItemDetails}>
            <Image source={{uri: item.image}} style={styles.orderItemImage} />
            <View style={styles.orderItemText}>
              <Text style={styles.orderItemName}>{item.name}</Text>
              {item.toppings &&
                item.toppings.length > 0 &&
                item.toppings.map((topping, toppingIndex) => (
                  <Text key={toppingIndex} style={styles.orderItemOption}>
                    + {topping.topping_name}
                  </Text>
                ))}
            </View>
          </View>
          <View style={styles.orderItemInfo}>
            <Text style={styles.orderItemQuantity}>
              Số lượng: {item.quantity}
            </Text>
            <Text style={styles.orderItemPrice}>{formatPrice(item.price)}</Text>
          </View>
        </View>
      ))}

      {/* Note */}
      {ordersNew.note && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>Ghi chú: {ordersNew.note}</Text>
        </View>
      )}

      {/* Payment Information */}
      <View style={styles.paymentInfoContainer}>
        <Text style={styles.paymentMethod}>
          Trả qua {ordersNew.order_pay || 'Tiền mặt'}
        </Text>

        <View style={[styles.paymentRow, {marginTop: 10}]}>
          <Text style={styles.paymentText}>Phí giao hàng:</Text>
          <Text style={styles.paymentText}>
            {formatPrice(ordersNew.delivery_fee || 0)}
          </Text>
        </View>

        <View style={styles.paymentTotal}>
          <Text style={styles.paymentTotalText}>Tổng tính</Text>
          <Text style={styles.paymentTotalText}>
            {formatPrice(ordersNew.price || 0)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreen;
