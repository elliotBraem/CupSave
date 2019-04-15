import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {compose, setPropTypes} from 'recompose';
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
  drinkSize: PropTypes.string,
  totalCupsSaved: PropTypes.number,
  level: PropTypes.string,
};

StatsOverview.defaultProps = {
  drinkSize: '16oz',
  totalCupsSaved: 0,
  level: '0',
};

const enhance = compose(
  // connect(mapStateToProps),
  setPropTypes({
    drinkSize: PropTypes.string,
    totalCupsSaved: PropTypes.number,
    level: PropTypes.string,
  })
);

export default enhance(StatsOverview);
