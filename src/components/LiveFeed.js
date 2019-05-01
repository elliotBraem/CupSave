import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import FeedList from './FeedList';
import {TitleText} from './TextComponents';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    marginTop: 50,
  },
  inner: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    marginLeft: 20,
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
});

const LiveFeed = ({feedContent}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.title}>
          <TitleText>Live Feed</TitleText>
        </View>
        <FeedList data={Object.entries(feedContent).reverse()} />
      </View>
    </View>
  );
};

LiveFeed.propTypes = {
  feedContent: PropTypes.object.isRequired,
};

export default LiveFeed;
