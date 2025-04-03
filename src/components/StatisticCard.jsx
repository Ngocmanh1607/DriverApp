import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
const StatisticCard = ({title, value, icon, color}) => (
  <View style={styles.cardContainer}>
    <View style={[styles.iconContainer, {backgroundColor: color + '20'}]}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  </View>
);

export default StatisticCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '50%',
    padding: 10,
  },
  cardContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 25,
    zIndex: 1,
    padding: 8,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
