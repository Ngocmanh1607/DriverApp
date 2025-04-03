import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  orderCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  orderDetail: {
    fontSize: 14,
    marginBottom: 4,
  },
  detail: {
    color: 'red',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FF4D4D',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#33CC66',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orderDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noOrderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  markerText: {
    fontSize: 20,
  },
});
export default styles;
