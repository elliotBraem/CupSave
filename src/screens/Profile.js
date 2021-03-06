import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Image, Button, Platform, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Header from '../components/CustomHeader';
import StatsOverview from '../components/StatsOverview';
import ProfileStats from '../components/ProfileStats';
import * as authActions from '../store/actions/auth';
import * as badgesActions from '../store/actions/badges';
import MaterialsContainer from '../components/MaterialsContainer';
import COLORS from '../constants/colors';
import {FBStorage} from '../data';
import LoadingComponent from '../components/Loading';
import ProfileSettings from '../components/ProfileSettings';

const profileImage = require('../assets/images/profileicon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 100 : 100 - 24,
  },
  containerSpacer: {
    flex: 1,
  },
  profileSettingsContainer: {
    justifyContent: 'space-between',
    flex: 2,
    width: '95%',
    //    height: 90,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
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
  statsOverviewContainer: {
    flex: 1,
  },
  settingsContainer: {
    flex: 0.5,
  },
  profileStatsContainer: {
    flex: 1,
  },
});

export class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    badges: PropTypes.shape({
      isLoaded: PropTypes.bool.isRequired,
      error: PropTypes.string,
      badgeList: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    auth: PropTypes.shape({
      isLoaded: PropTypes.func.isRequired,
      user: PropTypes.object.isRequired,
      uid: PropTypes.string.isRequired,
    }).isRequired,
    fetchAuthData: PropTypes.func.isRequired,
    fetchBadges: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const {badges, auth, fetchBadges, fetchAuthData} = props;

    if (!auth.isLoaded || Object.keys(auth.user).length === 0) {
      fetchAuthData();
    }

    if (!badges.isLoaded) {
      fetchBadges();
    }

    this.state = {
      avatar: profileImage,
      custom: false,
    };
  }

  componentDidMount() {
    const {auth} = this.props;

    FBStorage.ref()
      .child(`profilePictures/${auth.uid}`)
      .getDownloadURL()
      .then(image =>
        this.setState({
          avatar: image,
          custom: true,
        })
      )
      .catch(error => console.log(error.message));
  }

  render() {
    const {navigation, auth, badges} = this.props;
    const adjustedCups = (auth.user.consumption.total * auth.user.cup_volume_size) / 12;
    const {avatar, custom} = this.state;

    if (!auth.isLoaded || !badges.isLoaded) {
      return <LoadingComponent />;
    }

    return (
      <View style={styles.container}>
        <Header title="Profile" color={COLORS.primary} />
        <ScrollView contentContainerStyle={styles.inner}>
          <ProfileSettings navigation={navigation} />
          <StatsOverview
            totalCupsSaved={auth.user.consumption.total}
            level={auth.user.level}
            drinkSize={auth.user.cup_volume_oz}
          />
          <ProfileStats totalCupsSaved={auth.user.consumption.total} badges={badges} />
          <MaterialsContainer totalCupsSaved={adjustedCups} />
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
  const auth = state.auth || {};
  const badges = state.badges || {};

  return {
    auth,
    badges,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
