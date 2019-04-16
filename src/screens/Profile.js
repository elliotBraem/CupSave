import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Button} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';
import {withNavigation} from 'react-navigation';
import {compose} from 'redux';
import {connect} from 'react-redux';
import COLORS from '../constants/colors';
import CustomHeader from '../components/CustomHeader';
import StatsOverview from '../components/StatsOverview';

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

  componentDidUpdate(prevProps) {
    console.log('test');
  }

  componentWillReceiveProps(nextProps) {
    console.log('test2');
  }

  render() {
    const {navigation, profile} = this.props;

    return (
      <View style={styles.container}>
        <CustomHeader title="Profile" />
        <Image source={profileImage} style={styles.circle} />
        <StatsOverview
          key={profile.consumption.total}
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
