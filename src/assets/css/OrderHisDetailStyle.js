import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  // Order Header Section (combines status, ID and date)
  orderHeaderSection: {
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  // Status styles
  statusContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  // Order Info Header (ID and Date)
  orderInfoHeader: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderIdBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Customer Info styles
  orderInfo: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 10,
    borderRadius: 8,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  orderTime: {
    fontSize: 14,
    color: '#666',
  },
  orderUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    marginLeft: 5,
  },
  // Restaurant Info styles
  restaurantInfoContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  restaurantImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantRating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 4,
  },
  // Section header styles
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  // Order Items styles
  orderItemsWrapper: {
    backgroundColor: 'white',
    marginHorizontal: 12,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderItemContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastItemNoBorder: {
    borderBottomWidth: 0,
  },
  orderItemDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  orderItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  orderItemText: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  toppingsContainer: {
    marginBottom: 6,
  },
  orderItemOption: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  orderItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 13,
    color: '#666',
    marginRight: 4,
  },
  quantityValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  itemTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  itemTotalLabel: {
    fontSize: 14,
    color: '#666',
  },
  itemTotalValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  emptyItemsContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyItemsText: {
    fontSize: 15,
    color: '#666',
    marginTop: 8,
  },
  // Note styles
  noteContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    marginLeft: 5,
  },
  // Coupons Styles
  couponsContainer: {
    marginTop: 12,
    marginHorizontal: 12,
  },
  couponItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  couponLeftSide: {
    flex: 1,
  },
  couponCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  couponName: {
    fontSize: 13,
    color: '#666',
  },
  couponRightSide: {},
  couponValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f44336',
  },
  // Payment Info styles
  paymentInfoContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 12,
    marginBottom: 20,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentMethod: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  paymentText: {
    fontSize: 14,
    color: '#666',
  },
  paymentTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  paymentTotalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default styles;
