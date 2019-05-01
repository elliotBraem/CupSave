import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {StatText, StatSubtext, WasteText} from './TextComponents';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60%',
    width: '33%',
  },
});

const WasteItem = ({title, value}) => (
  <View style={styles.container}>
    <StatSubtext>{title}</StatSubtext>
    <WasteText>{value}</WasteText>
  </View>
);

WasteItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default WasteItem;
