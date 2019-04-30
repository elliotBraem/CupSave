import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';
import TotalCarbonSavedStat from './TotalCarbonSavedStat';
import WasteOverview from './WasteOverview';

const styles = StyleSheet.create({
  container: {
    width: '95%',
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

const MaterialsContainer = ({adjustedCups}) => (
  <View style={styles.container}>
    <WasteOverview
      paper={(adjustedCups * 0.0264555).toFixed(5)}
      cardboard={(adjustedCups * 0.00661387).toFixed(5)}
      plastic={(adjustedCups * 0.00683433).toFixed(5)}
    />
  </View>
);

MaterialsContainer.propTypes = {
  adjustedCups: PropTypes.number.isRequired,
};

export default MaterialsContainer;
