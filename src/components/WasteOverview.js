import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {BarChart} from 'react-native-chart-kit';
import COLORS from '../constants/colors';
import WasteItem from './WasteItem';

const styles = StyleSheet.create({
  container: {
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
    <BarChart
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      data={{
        labels: ['Waste Saved', 'Polyurethane Plastic Saved', 'C02e Saved'],
        datasets: [
          {
            data: [`${waste}`, `${polyPlastic}`, `${C02e}`],
          },
        ],
      }}
      width={Dimensions.get('window').width}
      height={220}
      yAxisLabel={'lbs.'}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
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
