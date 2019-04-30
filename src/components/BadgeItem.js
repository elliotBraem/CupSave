import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {AppText} from './TextComponents';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

const BadgeItem = ({name, icon}) => (
  <View style={styles.container}>
    <Image style={styles.circle} source={{uri: icon}} />
    {/* <AppText>{name}</AppText> */}
  </View>
);

BadgeItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default BadgeItem;
