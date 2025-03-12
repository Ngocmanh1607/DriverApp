import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
const InformationScreen = ({ route }) => {
    const { cccdData } = route.params;
    const [info, setInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        // Hàm tách dữ liệu từ QR CCCD
        const parseCCCDData = (info) => {
            const parts = info.split('|');
            if (parts.length < 7) return { error: 'Dữ liệu CCCD không hợp lệ' };

            return {
                id: parts[0],
                cmnd: parts[1],
                fullName: parts[2],
                dob: parts[3].slice(0, 2) + '/' + parts[3].slice(2, 4) + '/' + parts[3].slice(4),
                gender: parts[4],
                address: parts.slice(5, -1).join(', '),
                day: parts[parts.length - 1]
            };
        };
        const parsedInfo = parseCCCDData(cccdData);
        if (parsedInfo.error) {
            setErrorMessage(parsedInfo.error);
        } else {
            setInfo(parsedInfo);
        }
    }, [cccdData]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : (
                    <>
                        <TextInput
                            label="Số CCCD"
                            mode="outlined"
                            activeOutlineColor="#e74c3c"
                            value={info.id || ''}
                            style={styles.input}
                            onChangeText={(text) => setInfo({ ...info, id: text })}
                        />
                        <TextInput
                            label="Họ và tên"
                            mode="outlined"
                            activeOutlineColor="#e74c3c"
                            value={info.fullName || ''}
                            style={styles.input}
                            onChangeText={(text) => setInfo({ ...info, fullName: text })}
                        />
                        <TextInput
                            label="Ngày sinh"
                            mode="outlined"
                            activeOutlineColor="#e74c3c"
                            value={info.dob || ''}
                            style={styles.input}
                            onChangeText={(text) => setInfo({ ...info, dob: text })}
                        />
                        <TextInput
                            label="Địa chỉ"
                            mode="outlined"
                            activeOutlineColor="#e74c3c"
                            value={info.address || ''}
                            style={styles.input}
                            numberOfLines={2}
                            onChangeText={(text) => setInfo({ ...info, address: text })}
                        />
                    </>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => { navigation.navigate('Đăng kí thông tin') }}>
                    <Text style={styles.buttonText}>Xác nhận</Text>
                    <Icon name="edit" size={18} color="#fff" style={styles.logoutIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default InformationScreen

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
    errorText: {
        color: 'red',
        marginBottom: 10,
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