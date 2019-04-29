import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Button, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import COLORS from '../constants/colors';
import CustomHeader from '../components/CustomHeader';
import StatsOverview from '../components/StatsOverview';
import Loading from '../components/Loading';
import * as authActions from '../store/actions/auth';
import * as badgesActions from '../store/actions/badges';

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
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    badges: PropTypes.shape({
      isLoaded: PropTypes.bool.isRequired,
      error: PropTypes.string,
      badgeList: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    auth: PropTypes.object.isRequired,
    fetchAuthData: PropTypes.func.isRequired,
    fetchBadges: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const {badges, auth, fetchBadges, fetchAuthData} = props;

    if (!auth.user || Object.keys(auth.user).length === 0) {
      fetchAuthData();
    }

    if (!badges.isLoaded) {
      fetchBadges();
    }
  }

  componentDidMount = () => {
    const {fetchAuthData} = this.props;

    fetchAuthData();
  };

  render() {
    const {navigation, auth, badges} = this.props;

    if (!auth.isLoaded || !badges.isLoaded) {
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
            totalCupsSaved={auth.user.consumption.total}
            level={auth.user.level}
            drinkSize={auth.user.cup_volume_oz}
          />
          <Button onPress={() => navigation.navigate('Settings')} style={styles.button} title="Settings" />
        </View>
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
