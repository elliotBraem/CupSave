import React from 'react';
import {Text, StyleSheet} from 'react-native';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  normalText: {
    // fontFamily: 'Open-Sans',
    fontSize: 22,
    color: COLORS.white,
  },
  statText: {
    fontSize: 24,
    color: COLORS.secondary,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.white,
  },
});

export const AppText = props => {
  return <Text style={styles.normalText}>{props.children}</Text>;
};

export const StatText = props => {
  return <Text style={styles.statText}>{props.children}</Text>;
};

export const HeaderTitle = props => {
  return <Text style={styles.headerTitle}>{props.children}</Text>;
};
