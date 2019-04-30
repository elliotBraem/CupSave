import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';
import TotalCarbonSavedStat from './TotalCarbonSavedStat';

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

const MaterialsContainer = ({totalCupsSaved}) => (
  <View style={styles.container}>
    <TotalCarbonSavedStat totalCupsSaved={totalCupsSaved} />
  </View>
);

MaterialsContainer.propTypes = {
  totalCupsSaved: PropTypes.number.isRequired,
};

export default MaterialsContainer;
