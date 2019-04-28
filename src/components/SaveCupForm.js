import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';
import {AppText} from './TextComponents';
import Logo from '../assets/images/logo.png';

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 130,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  button: {
    marginTop: 10,
    width: 270,
    height: 70,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  logoIcon: {
    height: 45,
    width: 30,
    marginRight: 30,
  },
});

const SaveCupForm = ({onSaveCupFormSubmit}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onSaveCupFormSubmit} style={styles.button}>
      <Image source={Logo} style={styles.logoIcon} />
      <AppText>SAVE A CUP</AppText>
    </TouchableOpacity>
  </View>
);

SaveCupForm.propTypes = {
  onSaveCupFormSubmit: PropTypes.func.isRequired,
};

export default SaveCupForm;
