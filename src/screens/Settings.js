import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';
import ChangePassword from '../components/ChangePassword';
import ChangeEmail from '../components/ChangeEmail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  inner: {
    marginTop: Platform.OS === 'ios' ? 100 : 100 - 24,
    flex: 1,
    width: '80%',
  },
});

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Settings" />
      <View style={styles.inner}>
        <ChangePassword />
        <ChangeEmail />
      </View>
    </View>
  );
};

export default SettingsScreen;
