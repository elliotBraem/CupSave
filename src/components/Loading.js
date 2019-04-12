import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

export default Loading;
