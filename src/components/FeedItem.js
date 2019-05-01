import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {FeedText} from './TextComponents';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginBottom: 2,
    height: 60,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

const FeedItem = ({drink, location}) => {
  if (location.longitude !== 0) {
    return (
      <View style={styles.container}>
        <FeedText>saved a cup of {drink}</FeedText>
        <FeedText>
          -- at {location.longitude} x {location.latitude}
        </FeedText>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FeedText>saved a cup of {drink}</FeedText>
    </View>
  );
};

FeedItem.propTypes = {
  drink: PropTypes.string.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
};

FeedItem.defaultProps = {
  location: {
    latitude: 0,
    longitude: 0,
  },
};

export default FeedItem;
