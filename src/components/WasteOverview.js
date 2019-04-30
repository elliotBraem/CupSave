import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {BarChart, StackedBarChart} from 'react-native-chart-kit';
import COLORS from '../constants/colors';
import WasteItem from './WasteItem';

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 400,
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
    <StackedBarChart
      style={{
        marginVertical: 8,
        borderRadius: 16,
        marginHorizontal: 20,
      }}
      data={{
        labels: ['Waste Saved', 'C02e Saved'],
        legend: ['Non-plastic waste', 'Plastic waste', 'C02e'],
        data: [[`${waste}`, `${polyPlastic}`, null], [null, null, `${C02e}`]],
        barColors: ['#648381', '#E4FDE1', '#575761'],
      }}
      width={Dimensions.get('window').width}
      height={400}
      yAxisLabel={''}
      chartConfig={{
        height: 400,
        backgroundColor: COLORS.primary,
        backgroundGradientFrom: COLORS.primary,
        backgroundGradientTo: '#FFBF46',
        decimalPlaces: 3, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
    />
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
