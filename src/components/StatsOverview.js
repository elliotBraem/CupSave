import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';
import StatItem from './StatItem';

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 90,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  divider: {
    height: 70,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.lightGray,
  },
});

const StatsOverview = ({drinkSize, totalCupsSaved, level}) => (
  <View style={styles.container}>
    <StatItem title="My drink size" value={`${drinkSize}oz`} />
    <View style={styles.divider} />
    <StatItem title="Total cups saved" value={`${totalCupsSaved}`} />
    <View style={styles.divider} />
    <StatItem title="Level" value={`${level}`} />
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
