import React from 'react';
import {StyleSheet, View} from 'react-native';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {spinnerWhileLoading} from '../utils/components';
import SaveCupForm from '../components/SaveCupForm';
import LiveFeed from '../components/LiveFeed';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Home" />
      <SaveCupForm />
      <LiveFeed />
    </View>
  );
};

const enhance = compose(
  // withFirebase
  // connect(({firebase: {profile}}) => ({
  //   profile,
  // })),
  // spinnerWhileLoading(['profile'])
);

export default enhance(HomeScreen);
