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
  statSubtext: {
    fontSize: 12,
  },
  titleText: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.white,
  },
  worldCounterText: {
    color: COLORS.white,
    fontStyle: 'italic',
    fontSize: 18,
    marginTop: 20,
  },
  saveACupText: {
    marginTop: 40,
    color: COLORS.primary,
    fontSize: 48,
    paddingRight: 60,
  },
  saveTheWorldText: {
    color: COLORS.white,
    fontStyle: 'italic',
    fontSize: 48,
    paddingLeft: 40,
  },
});

export const AppText = props => {
  return <Text style={styles.normalText}>{props.children}</Text>;
};

export const StatText = props => {
  return <Text style={styles.statText}>{props.children}</Text>;
};

export const StatSubtext = props => {
  return <Text style={styles.statSubtext}>{props.children}</Text>;
};

export const TitleText = props => {
  return <Text style={styles.titleText}>{props.children}</Text>;
};

export const HeaderTitle = props => {
  return <Text style={styles.headerTitle}>{props.children}</Text>;
};

export const WorldCounterText = props => {
  return <Text style={styles.worldCounterText}>{props.children}</Text>;
};

export const SaveACupText = props => {
  return <Text style={styles.saveACupText}>{props.children}</Text>;
};

export const SaveTheWorldText = props => {
  return <Text style={styles.saveTheWorldText}>{props.children}</Text>;
};
