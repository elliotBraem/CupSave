import React from 'react';
import {StyleSheet, View, Platform, ScrollView} from 'react-native';
import Header from '../components/CustomHeader';
import ChangePassword from '../components/ChangePassword';
import ChangeEmail from '../components/ChangeEmail';
import ChangeCupSize from '../components/ChangeCupSize';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  inner: {
    paddingTop: Platform.OS === 'ios' ? 100 : 100 - 24,
    alignItems: 'center',
  },
});

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <ScrollView contentContainerStyle={styles.inner}>
        <ChangeCupSize />
        <ChangePassword />
        <ChangeEmail />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
