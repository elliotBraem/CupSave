import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Button, Text} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase, isLoaded} from 'react-redux-firebase';
import {withNavigation} from 'react-navigation';
import {compose} from 'redux';
import {connect} from 'react-redux';
import COLORS from '../constants/colors';
import CustomHeader from '../components/CustomHeader';
import StatsOverview from '../components/StatsOverview';
import Loading from '../components/Loading';

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

class ProfileScreen extends PureComponent {
  static propTypes = {
    profile: PropTypes.shape({
      consumption: PropTypes.shape({
        total: PropTypes.number,
      }),
      cup_volume_oz: PropTypes.number,
      level: PropTypes.number,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const {navigation, profile} = this.props;

    if (!isLoaded(profile)) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <CustomHeader title="Profile" />
        <Image source={profileImage} style={styles.circle} />
        <StatsOverview
          totalCupsSaved={profile.consumption.total}
          level={profile.level}
          drinkSize={profile.cup_volume_oz}
        />
        <Button onPress={() => navigation.navigate('Settings')} style={styles.button} title="Settings" />
      </View>
    );
  }
}

const enhance = compose(
  withFirebase,
  withNavigation,
  connect(({firebase: {profile}}) => ({
    profile,
  }))
);

export default enhance(ProfileScreen);
