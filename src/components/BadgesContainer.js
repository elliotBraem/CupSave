import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import BadgesList from './BadgesList';
import {TitleText} from './TextComponents';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 130,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    marginTop: 15,
  },
  inner: {
    marginTop: 15,
    marginLeft: 15,
  },
  title: {
    marginLeft: 5,
  },
  list: {
    paddingTop: 10,
  },
});

const BadgesContainer = ({badges}) => (
  <View style={styles.container}>
    <View style={styles.inner}>
      <View style={styles.title}>
        <TitleText>My Badges</TitleText>
      </View>
      <BadgesList style={styles.list} data={badges.badgeList} />
    </View>
  </View>
);

BadgesContainer.propTypes = {
  badges: PropTypes.shape({
    badgeList: PropTypes.array.isRequired,
  }).isRequired,
};

export default BadgesContainer;
