import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import SaveCupForm from '../components/SaveCupForm';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 15,
    justifyContent: 'center',
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <View style={styles.buttons}>
        <SaveCupForm />
      </View>
    </View>
  );
};

export default HomeScreen;
