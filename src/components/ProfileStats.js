import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Dimensions} from 'react-native';
import BadgesContainer from './BadgesContainer';
import MaterialsContainer from './MaterialsContainer';
import TotalCarbonSavedStat from './TotalCarbonSavedStat';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const ProfileStats = ({totalCupsSaved}) => (
  <View style={styles.container}>
    <BadgesContainer />
    <MaterialsContainer />
  </View>
);

ProfileStats.propTypes = {
  totalCupsSaved: PropTypes.number.isRequired,
};

export default ProfileStats;
