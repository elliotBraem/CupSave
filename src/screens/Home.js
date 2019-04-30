import React, {PureComponent} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SaveCupForm from '../components/SaveCupForm';
import LiveFeed from '../components/LiveFeed';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';
import * as authActions from '../store/actions/auth';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  inner: {
    paddingTop: Platform.OS === 'ios' ? 100 : 100 - 24,
    alignItems: 'center',
  },
});

class HomeScreen extends PureComponent {
  static propTypes = {
    incrementConsumption: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        consumption: PropTypes.shape({
          history: PropTypes.object.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    fetchAuthData: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const {fetchAuthData, auth} = this.props;

    if (!auth.isAuthenticated) {
      fetchAuthData();
    }
  };

  render() {
    const {auth, incrementConsumption} = this.props;

    if (!auth.isLoaded) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <CustomHeader title="Home" />
        <View style={styles.inner}>
          <SaveCupForm onSaveCupFormSubmit={incrementConsumption} />
          <LiveFeed feedContent={auth.user.consumption.history} />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    incrementConsumption: (drinkValue, locationEnabled) =>
      dispatch(authActions.dbIncrementConsumption(drinkValue, locationEnabled)),
    fetchAuthData: () => dispatch(authActions.dbOnAuthorizeStateChange()),
  };
};

const mapStateToProps = (state, ownProps) => {
  const auth = state.auth || {};

  return {
    auth,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
