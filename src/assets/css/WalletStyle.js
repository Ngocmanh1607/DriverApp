import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // Compact Header Section
  headerWrapper: {
    backgroundColor: '#FF4B3A',
    paddingTop: 30,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },

  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  balanceContainer: {
    flex: 1,
  },

  balanceTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
    fontWeight: '500',
  },

  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },

  withdrawButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },

  withdrawText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },

  // Tab Navigation
  tabContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  activeTab: {
    borderBottomColor: '#FF4B3A',
  },

  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#777',
  },

  activeTabText: {
    color: '#FF4B3A',
    fontWeight: '700',
  },

  // Content Area
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  // Transaction Items
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  transactionLeft: {
    flex: 2,
  },

  transactionRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  orderId: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 3,
  },

  transactionDate: {
    fontSize: 12,
    color: '#888',
  },

  earnAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00C853',
    marginBottom: 6,
  },

  // Withdrawal Items
  withdrawalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  withdrawalLeft: {
    flex: 2,
  },

  withdrawalRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  bankInfo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 3,
  },

  withdrawalDate: {
    fontSize: 12,
    color: '#888',
  },

  withdrawAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4B3A',
    marginBottom: 6,
  },

  // Status Tags
  statusTag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
  },

  statusTagPending: {
    backgroundColor: '#FFF3E0',
  },

  statusTagRejected: {
    backgroundColor: '#FFEBEE',
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00C853',
  },

  statusTextPending: {
    color: '#FF9800',
  },

  statusTextRejected: {
    color: '#F44336',
  },

  // Transaction Detail Section
  deliveryTransaction: {
    backgroundColor: '#FFF',
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  transactionLabel: {
    fontSize: 13,
    color: '#777',
  },

  transactionValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },

  statusBadge: {
    alignSelf: 'flex-end',
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
  },

  // Withdraw Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },

  closeButton: {
    alignSelf: 'flex-end',
    padding: 6,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bankSelector: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  bankSelectorText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },

  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#FF4B3A',
    paddingVertical: 12,
  },
  withdrawButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;
