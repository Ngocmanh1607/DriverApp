import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
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
    marginBottom: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
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
  restaurantRating: {
    fontSize: 14,
    color: '#FFD700',
  },

  // Order Items
  orderItemContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderItemDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  orderItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
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
  orderItemOption: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  orderItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
  },
  orderItemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  orderItemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  // Note Section
  noteContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
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
  noteText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
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
  paymentMethod: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
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
