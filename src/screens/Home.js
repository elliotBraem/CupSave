import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import SaveCupForm from '../components/SaveCupForm';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  saveACupContainer: {
    marginTop: 120,
    // flexDirection: 'column',
    // // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    margin: 15,
    justifyContent: 'center',
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.saveACupContainer}>
        <SaveCupForm />
      </View>
    </View>
  );
};

export default HomeScreen;
