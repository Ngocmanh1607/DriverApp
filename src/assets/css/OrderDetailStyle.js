import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },

  // Status styles
  statusContainer: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Order Info Section
  orderInfo: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  orderTime: {
    fontSize: 14,
    color: '#666',
  },
  orderUser: {
    marginBottom: 8,
  },
  customerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  icon: {
    marginHorizontal: 8,
  },

  // Restaurant Section
  restaurantInfoContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  restaurantDetails: {
    marginLeft: 16,
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantRating: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },

  // Section title
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  orderItemsWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // Order Items
  orderItemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastItemNoBorder: {
    borderBottomWidth: 0,
  },
  orderItemDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  orderItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  orderItemText: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  toppingsContainer: {
    marginTop: 4,
  },
  orderItemOption: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  orderItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#f0f0f0',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  quantityValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  orderItemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  itemTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  itemTotalLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  itemTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FF5722',
  },
  emptyItemsContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyItemsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  // Note Section
  noteContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    flex: 1,
  },

  // Payment Section
  paymentInfoContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentMethod: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentText: {
    fontSize: 14,
    color: '#666',
  },
  paymentTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 12,
    paddingTop: 12,
  },
  paymentTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default styles;
