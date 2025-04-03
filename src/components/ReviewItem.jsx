import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {formatDate} from '../utils/format';
const ReviewItem = ({review}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: review.image}} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.userName}>{review.name}</Text>
        <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        <View style={styles.starRow}>
          {[...Array(review.dri_rating)].map((_, index) => (
            <FontAwesome key={index} name="star" size={16} color="gold" />
          ))}
        </View>
        <Text style={styles.reviewText}>{review.dri_comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  avatar: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  userName: {
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
  starRow: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  reviewText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ReviewItem;
