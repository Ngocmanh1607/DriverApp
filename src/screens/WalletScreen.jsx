import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Alert, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../assets/css/WalletStyle';
import { formatPrice } from '../utils/formatPrice';

const WalletScreen = () => {
    const [balance, setBalance] = useState(1500000);
    const [transactions, setTransactions] = useState([
        {
            id: 1,
            type: 'deposit',
            amount: 500000,
            date: '2024-03-20',
            status: 'completed',
            note: 'Tiền từ chuyến đi #123'
        },
        {
            id: 2,
            type: 'withdraw',
            amount: 300000,
            date: '2024-03-19',
            status: 'completed',
            note: 'Rút về STK: *****6789'
        }
    ]);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [withdrawType, setWithdrawType] = useState('bank'); // 'bank' hoặc 'zalopay'
    const [zaloPayNumber, setZaloPayNumber] = useState('');

    const handleWithdraw = () => {
        if (!withdrawAmount) {
            Alert.alert('Thông báo', 'Vui lòng nhập số tiền');
            return;
        }

        if (withdrawType === 'bank' && (!bankAccount || !bankName || !accountName)) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin ngân hàng');
            return;
        }

        if (withdrawType === 'zalopay' && !zaloPayNumber) {
            Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại ZaloPay');
            return;
        }

        const amount = parseFloat(withdrawAmount);
        if (isNaN(amount) || amount <= 0) {
            Alert.alert('Thông báo', 'Số tiền không hợp lệ');
            return;
        }

        if (amount > balance) {
            Alert.alert('Thông báo', 'Số dư không đủ');
            return;
        }

        // Thêm giao dịch mới
        const newTransaction = {
            id: transactions.length + 1,
            type: 'withdraw',
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            status: 'pending',
            note: withdrawType === 'bank' ?
                `Rút về STK: ${bankAccount}` :
                `Rút về ZaloPay: ${zaloPayNumber}`
        };

        setTransactions([newTransaction, ...transactions]);
        setShowWithdrawModal(false);
        setWithdrawAmount('');
        setBankAccount('');
        setBankName('');
        setAccountName('');
        setZaloPayNumber('');

        Alert.alert(
            'Thành công',
            'Yêu cầu rút tiền của bạn đã được ghi nhận và đang được xử lý'
        );
    };

    return (
        <View style={styles.container}>
            {/* Header với số dư */}
            <View style={styles.header}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
                    <Text style={styles.balanceAmount}>{formatPrice(balance)}</Text>
                </View>
            </View>

            {/* Các nút thao tác */}
            <View style={styles.actionContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setShowWithdrawModal(true)}
                >
                    <View style={styles.actionIcon}>
                        <FontAwesome name="money" size={24} color="#e74c3c" />
                    </View>
                    <Text style={styles.actionText}>Rút tiền</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionIcon}>
                        <FontAwesome name="history" size={24} color="#e74c3c" />
                    </View>
                    <Text style={styles.actionText}>Lịch sử</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionIcon}>
                        <FontAwesome name="bank" size={24} color="#e74c3c" />
                    </View>
                    <Text style={styles.actionText}>Tài khoản</Text>
                </TouchableOpacity>
            </View>

            {/* Lịch sử giao dịch */}
            <Text style={styles.sectionTitle}>Lịch sử giao dịch</Text>
            <ScrollView>
                {transactions.map(transaction => (
                    <View key={transaction.id} style={styles.transactionContainer}>
                        <View style={styles.transactionHeader}>
                            <Text style={[
                                styles.transactionAmount,
                                transaction.type === 'withdraw' ? styles.withdrawAmount : styles.depositAmount
                            ]}>
                                {transaction.type === 'withdraw' ? '-' : '+'}{formatPrice(transaction.amount)}
                            </Text>
                            <Text style={styles.transactionDate}>{transaction.date}</Text>
                        </View>
                        <Text>{transaction.note}</Text>
                        <Text style={[
                            styles.transactionStatus,
                            transaction.status === 'completed' ? styles.statusCompleted :
                                transaction.status === 'pending' ? styles.statusPending : styles.statusFailed
                        ]}>
                            {transaction.status === 'completed' ? 'Hoàn thành' :
                                transaction.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Modal rút tiền */}
            <Modal
                visible={showWithdrawModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowWithdrawModal(false)}
                        >
                            <FontAwesome name="close" size={24} color="#000" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Rút tiền</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Số tiền muốn rút"
                            keyboardType="numeric"
                            value={withdrawAmount}
                            onChangeText={setWithdrawAmount}
                        />

                        <View style={styles.actionContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton, withdrawType === 'bank' && styles.actionButtonActive]}
                                onPress={() => setWithdrawType('bank')}
                            >
                                <Text>Ngân hàng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, withdrawType === 'zalopay' && styles.actionButtonActive]}
                                onPress={() => setWithdrawType('zalopay')}
                            >
                                <Text>ZaloPay</Text>
                            </TouchableOpacity>
                        </View>

                        {withdrawType === 'bank' ? (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Tên ngân hàng"
                                    value={bankName}
                                    onChangeText={setBankName}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Số tài khoản"
                                    keyboardType="numeric"
                                    value={bankAccount}
                                    onChangeText={setBankAccount}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Tên chủ tài khoản"
                                    value={accountName}
                                    onChangeText={setAccountName}
                                />
                            </>
                        ) : (
                            <TextInput
                                style={styles.input}
                                placeholder="Số điện thoại ZaloPay"
                                keyboardType="numeric"
                                value={zaloPayNumber}
                                onChangeText={setZaloPayNumber}
                            />
                        )}

                        <TouchableOpacity
                            style={styles.withdrawButton}
                            onPress={handleWithdraw}
                        >
                            <Text style={styles.withdrawButtonText}>Xác nhận rút tiền</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default WalletScreen; 