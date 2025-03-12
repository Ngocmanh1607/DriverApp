import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Test = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Thông tin CCCD</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    label="Số CCCD"
                    mode="outlined"
                    activeOutlineColor="#e74c3c"
                    style={styles.input}
                />
                <TextInput
                    label="Họ và tên"
                    mode="outlined"
                    activeOutlineColor="#e74c3c"
                    style={styles.input}
                />
                <TextInput
                    label="Ngày sinh"
                    mode="outlined"
                    activeOutlineColor="#e74c3c"
                    style={styles.input}
                />
                <TextInput
                    label="Địa chỉ"
                    mode="outlined"
                    activeOutlineColor="#e74c3c"
                    style={styles.input}
                    numberOfLines={2}
                />
                <TextInput
                    label="Quê quán"
                    mode="outlined"
                    activeOutlineColor="#e74c3c"
                    style={styles.input}
                    numberOfLines={2}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => { }}>
                    <Text style={styles.buttonText}>Xác nhận</Text>
                    <Icon name="edit" size={18} color="#fff" style={styles.logoutIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Test

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        padding: 10,
    },
    input: {
        marginBottom: 20,
        color: '#666',
    },
    buttonContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    editButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#e74c3c',
        paddingVertical: 14,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 10,
    }
})