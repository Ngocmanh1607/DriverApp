import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <Modal animationType="none" transparent={true} visible={true}>
      <ActivityIndicator size="large" color="red" style={styles.container} />
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
