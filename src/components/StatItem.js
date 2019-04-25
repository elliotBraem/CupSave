import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';
import {StatText, StatSubtext} from './TextComponents';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60%',
    width: '33%',
  },
});

const StatItem = ({title, value}) => (
  <View style={styles.container}>
    <StatSubtext>{title}</StatSubtext>
    <StatText>{value}</StatText>
  </View>
);

StatItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default StatItem;
