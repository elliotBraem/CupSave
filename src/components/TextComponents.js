import React from 'react';
import {Text, StyleSheet} from 'react-native';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  normalText: {
    fontFamily: 'open-sans-regular',
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
    fontFamily: 'open-sans-italic',
    color: COLORS.white,
    fontSize: 18,
    marginTop: 20,
  },
  saveACupText: {
    fontFamily: 'open-sans-bold',
    marginTop: 40,
    color: COLORS.primary,
    fontSize: 48,
    paddingRight: 60,
  },
  saveTheWorldText: {
    fontFamily: 'open-sans-italic',
    color: COLORS.white,
    fontSize: 48,
    paddingLeft: 40,
  },
  aboutUsText: {
    fontFamily: 'open-sans',
    color: COLORS.white,
    fontSize: 20,
    paddingLeft: 10,
  },
  aboutUsAuthorText: {
    fontFamily: 'open-sans-italic',
    color: COLORS.secondary,
    fontSize: 14,
    paddingLeft: 10,
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

export const AboutUsText = props => {
  return <Text style={styles.aboutUsText}>{props.children}</Text>;
};

export const AboutUsAuthorText = props => {
  return <Text style={styles.aboutUsAuthorText}>{props.children}</Text>;
};
