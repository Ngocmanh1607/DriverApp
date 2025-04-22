import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF6347',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 5,
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
  },
  actionIcon: {
    backgroundColor: '#ffeaea',
    padding: 10,
    borderRadius: 25,
    marginBottom: 5,
  },
  actionText: {
    color: '#333',
    fontSize: 14,
  },
  actionButtonActive: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 25,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    margin: 20,
    color: '#2c3e50',
  },
  transactionContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  withdrawAmount: {
    color: '#e74c3c',
  },
  depositAmount: {
    color: '#27ae60',
  },
  transactionDate: {
    color: '#7f8c8d',
    fontSize: 12,
  },
  transactionStatus: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  deliveryTransaction: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  transactionLabel: {
    fontSize: 14,
    color: '#666',
  },

  transactionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  statusBadge: {
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },

  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  statusPending: {
    backgroundColor: '#f1c40f',
    color: '#fff',
  },
  statusCompleted: {
    backgroundColor: '#2ecc71',
    color: '#fff',
  },
  statusFailed: {
    backgroundColor: '#e74c3c',
    color: '#fff',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  withdrawButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default styles;
