import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Image, Button, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import StatsOverview from '../components/StatsOverview';
import ProfileStats from '../components/ProfileStats';
import Loading from '../components/Loading';
import * as authActions from '../store/actions/auth';
import * as badgesActions from '../store/actions/badges';
import COLORS from '../constants/colors';

const profileImage = require('../assets/images/profileicon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  inner: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 100 : 100 - 24,
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

class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    badges: PropTypes.shape({
      isLoaded: PropTypes.bool.isRequired,
      error: PropTypes.string,
      badgeList: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    user: PropTypes.object.isRequired,
    userIsLoaded: PropTypes.bool.isRequired,
    fetchAuthData: PropTypes.func.isRequired,
    fetchBadges: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const {badges, user, fetchBadges, fetchAuthData, userIsLoaded} = props;

    if (!userIsLoaded || !user || Object.keys(user).length === 0) {
      fetchAuthData();
    }

    if (!badges.isLoaded) {
      fetchBadges();
    }
  }

  render() {
    const {navigation, user, badges, userIsLoaded} = this.props;

    if (!userIsLoaded || !badges.isLoaded) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <CustomHeader title="Profile" />
        <ScrollView contentContainerStyle={styles.inner}>
          <View style={styles.circle}>
            <Image source={profileImage} style={styles.image} />
          </View>
          <StatsOverview totalCupsSaved={user.consumption.total} level={user.level} drinkSize={user.cup_volume_oz} />
          <Button onPress={() => navigation.navigate('Settings')} style={styles.button} title="Settings" />
          <ProfileStats totalCupsSaved={user.consumption.total} badges={badges} />
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAuthData: () => dispatch(authActions.dbOnAuthorizeStateChange()),
    fetchBadges: () => dispatch(badgesActions.dbGetBadges()),
  };
};

const mapStateToProps = (state, ownProps) => {
  const user = state.auth.user || {};
  const userIsLoaded = state.auth.isLoaded || false;
  const badges = state.badges || {};

  return {
    user,
    userIsLoaded,
    badges,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
