import React, {PureComponent} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SaveCupForm from '../components/SaveCupForm';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';
import * as authActions from '../store/actions/auth';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  inner: {
    marginTop: Platform.OS === 'ios' ? 100 : 100 - 24,
  },
});

class HomeScreen extends PureComponent {
  static propTypes = {
    incrementConsumption: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
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
        <CustomHeader title="Home" style={styles.header} />
        <View style={styles.inner}>
          <SaveCupForm onSaveCupFormSubmit={incrementConsumption} />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    incrementConsumption: () => dispatch(authActions.dbIncrementConsumption()),
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
