import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../assets/css/RewardStyle';
import {formatPrice} from '../utils/formatPrice';

const RewardScreen = () => {
  const [points, setPoints] = useState(1500); // Điểm tích lũy
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Danh sách phần thưởng mẫu
  const rewards = [
    {
      id: 1,
      title: 'Voucher Giảm 50k',
      description: 'Áp dụng cho đơn hàng từ 100k',
      points: 500,
      category: 'voucher',
      image: require('../assets/images/voucher.png'),
    },
    {
      id: 2,
      title: 'Thẻ nạp điện thoại 100k',
      description: 'Áp dụng cho tất cả nhà mạng',
      points: 1000,
      category: 'phone',
      image: require('../assets/images/phone-card.png'),
    },
    {
      id: 3,
      title: 'Voucher Grab 100k',
      description: 'Áp dụng cho GrabFood',
      points: 1000,
      category: 'voucher',
      image: require('../assets/images/grab.png'),
    },
  ];

  // Lịch sử đổi thưởng
  const [history] = useState([
    {
      id: 1,
      title: 'Đổi voucher Grab 100k',
      date: '20/03/2024',
      points: -1000,
    },
    {
      id: 2,
      title: 'Nhận điểm từ chuyến đi',
      date: '19/03/2024',
      points: 500,
    },
  ]);

  const handleExchange = reward => {
    setSelectedReward(reward);
    setShowExchangeModal(true);
  };

  const confirmExchange = () => {
    if (points < selectedReward.points) {
      Alert.alert('Thông báo', 'Bạn không đủ điểm để đổi phần thưởng này');
      return;
    }

    // Trừ điểm và thêm vào lịch sử
    setPoints(points - selectedReward.points);
    setShowExchangeModal(false);

    Alert.alert(
      'Thành công',
      'Bạn đã đổi thưởng thành công. Phần thưởng sẽ được gửi đến bạn qua email.',
    );
  };

  const filteredRewards = rewards.filter(reward => {
    const matchesCategory =
      selectedCategory === 'all' || reward.category === selectedCategory;
    const matchesSearch = reward.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Header với số điểm */}
      <View style={styles.header}>
        <View style={styles.pointContainer}>
          <Text style={styles.pointLabel}>Điểm tích lũy của bạn</Text>
          <Text style={styles.pointAmount}>{points} điểm</Text>
        </View>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#7f8c8d" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm phần thưởng..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Bộ lọc danh mục */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedCategory === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedCategory('all')}>
          <Text
            style={[
              styles.filterText,
              selectedCategory === 'all' && styles.filterTextActive,
            ]}>
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedCategory === 'voucher' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedCategory('voucher')}>
          <Text
            style={[
              styles.filterText,
              selectedCategory === 'voucher' && styles.filterTextActive,
            ]}>
            Voucher
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedCategory === 'phone' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedCategory('phone')}>
          <Text
            style={[
              styles.filterText,
              selectedCategory === 'phone' && styles.filterTextActive,
            ]}>
            Thẻ điện thoại
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Danh sách phần thưởng */}
        <Text style={styles.sectionTitle}>Phần thưởng có sẵn</Text>
        {filteredRewards.map(reward => (
          <View key={reward.id} style={styles.rewardContainer}>
            <Image source={reward.image} style={styles.rewardImage} />
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardTitle}>{reward.title}</Text>
              <Text style={styles.rewardDescription}>{reward.description}</Text>
              <Text style={styles.pointRequired}>{reward.points} điểm</Text>
              <TouchableOpacity
                style={[
                  styles.exchangeButton,
                  points < reward.points && styles.exchangeButtonDisabled,
                ]}
                onPress={() => handleExchange(reward)}
                disabled={points < reward.points}>
                <Text style={styles.exchangeButtonText}>
                  {points < reward.points ? 'Không đủ điểm' : 'Đổi ngay'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Lịch sử đổi thưởng */}
        <Text style={styles.sectionTitle}>Lịch sử đổi thưởng</Text>
        {history.map(item => (
          <View key={item.id} style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <Text style={styles.historyPoints}>
              {item.points > 0 ? '+' : ''}
              {item.points} điểm
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Modal xác nhận đổi thưởng */}
      <Modal
        visible={showExchangeModal}
        transparent={true}
        animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xác nhận đổi thưởng</Text>
            {selectedReward && (
              <>
                <Text style={styles.modalDescription}>
                  Bạn có chắc chắn muốn đổi {selectedReward.title} với{' '}
                  {selectedReward.points} điểm?
                </Text>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmExchange}>
                  <Text style={styles.confirmButtonText}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowExchangeModal(false)}>
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RewardScreen;
