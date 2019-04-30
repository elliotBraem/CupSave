/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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
  labelText: {
    fontSize: 8,
    color: COLORS.secondary,
  },
  feedText: {
    fontSize: 12,
    color: COLORS.secondary,
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

export const LabelText = props => {
  return <Text style={styles.labelText}>{props.children}</Text>;
};

export const FeedText = props => {
  return <Text style={styles.feedText}>{props.children}</Text>;
};
