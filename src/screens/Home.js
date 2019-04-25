import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import SaveCupForm from '../components/SaveCupForm';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  inner: {
    marginTop: Platform.OS === 'ios' ? 100 : 100 - 24,
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Home" style={styles.header} />
      <View style={styles.inner}>
        <SaveCupForm />
      </View>
    </View>
  );
};

export default HomeScreen;
