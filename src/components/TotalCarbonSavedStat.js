import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';
import StatItem from './StatItem';

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const TotalCarbonSavedStat = ({totalCupsSaved}) => (
  <View style={styles.container}>
    <StatItem title="Total cups saved" value={`${totalCupsSaved}`} />
  </View>
);

TotalCarbonSavedStat.propTypes = {
  totalCupsSaved: PropTypes.number.isRequired,
};

export default TotalCarbonSavedStat;
