import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';
import StatItem from './StatItem';

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 530,
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
    marginTop: 15,
  },
});

const TotalCarbonSavedStat = ({drinkSize, totalCupsSaved, level}) => (
  <View style={styles.container}>
    <StatItem title="My drink size" value={`${drinkSize}oz`} />
    <View style={styles.divider} />
    <StatItem title="Total cups saved" value={`${totalCupsSaved}`} />
    <View style={styles.divider} />
    <StatItem title="Level" value={`${level}`} />
  </View>
);

TotalCarbonSavedStat.propTypes = {
  drinkSize: PropTypes.number,
  totalCupsSaved: PropTypes.number,
  level: PropTypes.number,
};

TotalCarbonSavedStat.defaultProps = {
  drinkSize: 16,
  totalCupsSaved: 0,
  level: 0,
};

export default TotalCarbonSavedStat;
