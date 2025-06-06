import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PasswordInput = ({value, onChangeText, placeholderText}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <View style={styles.inputSignContainer}>
      <Fontisto
        name="locked"
        color="#9a9a9a"
        size={24}
        style={styles.inputIcon}
      />
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholderText}
        secureTextEntry={!isPasswordVisible}
        placeholderTextColor="#A9A9A9"
      />
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Ionicons
          name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
          color="#9a9a9a"
          size={24}
          style={styles.inputPassIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputSignContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 40,
    marginVertical: 10,
    elevation: 10,
    alignItems: 'center',
    height: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
  },
  inputPassIcon: {
    marginHorizontal: 10,
  },
});

export default PasswordInput;
