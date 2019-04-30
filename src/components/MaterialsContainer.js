import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';
import TotalCarbonSavedStat from './TotalCarbonSavedStat';
import WasteOverview from './WasteOverview';
import {TitleText} from './TextComponents';

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
  title: {
    marginLeft: 40,
  },
  inner: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
  },
});

const MaterialsContainer = ({totalCupsSaved}) => (
  <View style={styles.container}>
    <View style={styles.inner}>
      <View style={styles.title}>
        <TitleText>Materials Saved</TitleText>
      </View>
    <WasteOverview
      paper={(totalCupsSaved * 0.0264555).toFixed(5)}
      cardboard={(totalCupsSaved * 0.00661387).toFixed(5)}
      plastic={(totalCupsSaved * 0.00683433).toFixed(5)}
    />
    </View>
  </View>
);

MaterialsContainer.propTypes = {
  totalCupsSaved: PropTypes.number.isRequired,
};

export default MaterialsContainer;
