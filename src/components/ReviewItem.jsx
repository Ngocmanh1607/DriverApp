import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import images from '../assets/images';
import { formatDate } from '../utils/format';
const ReviewItem = ({ review }) => {
    return (
        <View style={styles.container}>
            <Image source={images.avatar} style={styles.avatar} />
            <View style={styles.content}>
                <Text style={styles.userName}>{review.user}</Text>
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
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
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