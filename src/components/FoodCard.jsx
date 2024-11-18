// src/components/FoodCard.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import ToggleSwitch from './ToggleSwitch';
import { useNavigation } from '@react-navigation/native';
import { publicProductApi, unPublicProductApi } from '../api/foodApi';
import Snackbar from 'react-native-snackbar';

const FoodCard = ({ food }) => {
    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(true);
    const handleToggle = () => {
        setIsEnabled(previousState => !previousState);
    };
    const updateStatus = async (foodId) => {
        if (isEnabled) {
            const response = await publicProductApi(foodId)
            if (response == true) {
                Snackbar.show({ text: 'Tắt sản phẩm thành công', duration: Snackbar.LENGTH_SHORT });
                handleToggle()
            }
            else {
                Snackbar.show({ text: 'Cập nhật thất bại', duration: Snackbar.LENGTH_SHORT });
            }
        }
        else {
            const response = await unPublicProductApi(foodId)
            console.log(response)
            if (response == true) {
                Snackbar.show({ text: 'Bật sản phẩm thành công', duration: Snackbar.LENGTH_SHORT });
                handleToggle()
            }
            else {
                Snackbar.show({ text: 'Cập nhật thất bại', duration: Snackbar.LENGTH_SHORT });
            }
        }
    }
    return (
        <TouchableOpacity style={[styles.foodItem, { opacity: isEnabled ? 1 : 0.5 }]} onPress={() => { navigation.navigate('Chỉnh sửa món ăn', { food }) }}>
            <Image style={styles.foodImage} source={{ uri: food.image }} />
            <View style={styles.foodDetails}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodDes}>{food.descriptions}</Text>
                <Text style={styles.foodPrice}>{food.price}</Text>
            </View>
            <ToggleSwitch isEnabled={isEnabled} onToggle={() => { updateStatus(food.id) }} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    foodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 5,
    },
    foodImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    foodDetails: {
        flex: 1,
        marginLeft: 16,
    },
    foodName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    foodDes: {
        fontSize: 14,
        color: '#666',
    },
    foodPrice: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
});

export default FoodCard;