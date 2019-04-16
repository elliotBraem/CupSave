import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';
import {StatText} from './TextComponents';

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 90,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const StatsOverview = ({drinkSize, totalCupsSaved, level}) => (
  <View style={styles.container}>
    <StatText style={styles.statText}>{drinkSize}</StatText>
    <StatText style={styles.statText}>{totalCupsSaved}</StatText>
    <StatText style={styles.statText}>{level}</StatText>
  </View>
);

StatsOverview.propTypes = {
  drinkSize: PropTypes.number,
  totalCupsSaved: PropTypes.number,
  level: PropTypes.number,
};

StatsOverview.defaultProps = {
  drinkSize: 16,
  totalCupsSaved: 0,
  level: 0,
};

export default StatsOverview;
