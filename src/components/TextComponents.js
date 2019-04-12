import React from 'react';
import {Text, StyleSheet} from 'react-native';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  normalText: {
    // fontFamily: 'Open-Sans',
    fontSize: 22,
    color: COLORS.white,
  },
});

const AppText = props => {
  return <Text style={styles.normalText}>{props.children}</Text>;
};

export default AppText;
