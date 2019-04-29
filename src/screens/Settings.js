import React from 'react';
import {StyleSheet, View, Platform, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import ChangePassword from '../components/ChangePassword';
import ChangeEmail from '../components/ChangeEmail';
import ChangeCupSize from '../components/ChangeCupSize';
import COLORS from '../constants/colors';

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
      <ScrollView style={styles.inner}>
        <ChangeCupSize />
        <ChangePassword />
        <ChangeEmail />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
