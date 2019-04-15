import React, {Component} from 'react';
import {StyleSheet, View, Image, Button} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import {withNavigation} from 'react-navigation';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import StatsOverview from '../components/StatsOverview';
import COLORS from '../constants/colors';
import CustomHeader from '../components/CustomHeader';

const profileImage = require('../assets/images/profileicon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  circle: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 80,
    backgroundColor: 'black',
  },
});

class ProfileScreen extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      consumption: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

  state = {};

  render() {
    const {navigation, profile} = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader title="Profile" />
        <Image source={profileImage} style={styles.circle} />
        <StatsOverview totalCupsSaved={profile.consumption.total} />
        <Button onPress={() => navigation.navigate('Settings')} style={styles.button} title="Settings" />
      </View>
    );
  }
}

const enhance = compose(
  withNavigation,
  withFirebase,
  withFirestore,
  connect(({firebase: {profile}}) => ({
    profile,
  }))
);

export default enhance(ProfileScreen);
