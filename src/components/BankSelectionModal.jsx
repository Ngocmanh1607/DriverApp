import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
const BANK_LIST = [
  { id: 'VCB', name: 'Vietcombank', code: 'VCB' },
  { id: 'TCB', name: 'Techcombank', code: 'TCB' },
  { id: 'VTB', name: 'VietinBank', code: 'VTB' },
  { id: 'BIDV', name: 'BIDV', code: 'BIDV' },
  { id: 'ACB', name: 'ACB', code: 'ACB' },
  { id: 'MBB', name: 'MB Bank', code: 'MBB' },
  { id: 'TPB', name: 'TPBank', code: 'TPB' },
  { id: 'STB', name: 'Sacombank', code: 'STB' },
];
const BankSelectionModal = ({
  visible,
  onClose,
  onSelectBank,
  selectedBank,
}) => {
  const renderBankItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.bankItem,
        selectedBank?.id === item.id && styles.selectedBankItem,
      ]}
      onPress={() => {
        onSelectBank(item);
        onClose();
      }}>
      <Text style={styles.bankName}>{item.name}</Text>
      <Text style={styles.bankCode}>({item.code})</Text>
      {selectedBank?.id === item.id && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chọn ngân hàng</Text>

          <FlatList
            data={BANK_LIST}
            renderItem={renderBankItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  listContainer: {
    paddingVertical: 10,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedBankItem: {
    backgroundColor: '#f0f0f0',
  },
  bankName: {
    fontSize: 16,
    flex: 1,
  },
  bankCode: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
});

export default BankSelectionModal;
