import React, { useState } from 'react';

import { View, Switch, StyleSheet } from 'react-native';

const ToggleSwitch = ({ isEnabled, onToggle }) => {

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: "#767577", true: "#00FF00" }}
                thumbColor="#f4f3f4"
                onValueChange={onToggle}
                value={isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ToggleSwitch;
