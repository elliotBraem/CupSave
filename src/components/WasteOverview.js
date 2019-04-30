import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {BarChart} from 'react-native-chart-kit';
import COLORS from '../constants/colors';
import WasteItem from './WasteItem';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: '95%',
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
  graphStyle: {},
});

const WasteOverview = ({waste, polyPlastic, C02e}) => (
  <View style={styles.container}>
    <WasteItem title="Waste saved" value={`${waste} lbs.`} />
    <View style={styles.divider} />
    <WasteItem title="Plastic saved" value={`${polyPlastic} lbs.`} />
    <View style={styles.divider} />
    <WasteItem title="C02e saved" value={`${C02e} lbs.`} />
  </View>
);

WasteOverview.propTypes = {
  waste: PropTypes.string,
  polyPlastic: PropTypes.string,
  C02e: PropTypes.string,
};

WasteOverview.defaultProps = {
  waste: 0,
  polyPlastic: 0,
  C02e: 0,
};

export default WasteOverview;
