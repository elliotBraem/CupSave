import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Button, Platform, TouchableOpacity} from 'react-native';
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
  inner: {
    marginTop: Platform.OS === 'ios' ? 100 : 100 - 24,
  },
  circle: {
    width: 160,
    height: 160,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 80,
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 100,
  },
  image: {
    width: 160,
    height: 160,
  },
});

// SettingsButton.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

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
        <View style={styles.inner}>
          <View style={styles.circle}>
            <Image source={profileImage} style={styles.image} />
          </View>
          <StatsOverview
            totalCupsSaved={profile.consumption.total}
            level={profile.level}
            drinkSize={profile.cup_volume_oz}
          />
          <Button onPress={() => navigation.navigate('Settings')} style={styles.button} title="Settings" />
        </View>
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
