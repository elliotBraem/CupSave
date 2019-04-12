import React from 'react';
import {StyleSheet, View} from 'react-native';
import SaveCupForm from '../components/SaveCupForm';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  saveACupContainer: {
    marginTop: 120,
  },
  button: {
    margin: 15,
    justifyContent: 'center',
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Home" />
      <View style={styles.saveACupContainer}>
        <SaveCupForm />
      </View>
    </View>
  );
};

export default HomeScreen;
