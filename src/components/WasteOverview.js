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

const WasteOverview = ({paper, plastic, cardboard}) => (
  <View style={{marginTop: 10, marginBottom: 10}}>
    <BarChart
      style={{
        marginVertical: 8,
        borderRadius: 16,
        marginHorizontal: 20,
      }}
      data={{
        labels: ['Paper', 'Cardboard', 'Plastic'],
        datasets: [
          {
            data: [`${paper}`, `${plastic}`, cardboard],
          },
        ],
      }}
      width={Dimensions.get('window').width * 0.8}
      height={400}
      yAxisLabel={'lbs: '}
      chartConfig={{
        height: 400,
        backgroundColor: COLORS.primary,
        backgroundGradientFrom: COLORS.primary,
        backgroundGradientTo: '#507DBC',
        decimalPlaces: 3, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      fromZero={true}
    />
  </View>
);

WasteOverview.propTypes = {
  paper: PropTypes.string,
  plastic: PropTypes.string,
  cardboard: PropTypes.string,
};

WasteOverview.defaultProps = {
  paper: 0,
  plastic: 0,
  cardboard: 0,
};

export default WasteOverview;
