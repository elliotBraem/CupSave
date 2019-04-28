import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as authActions from '../store/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class LoadingScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {navigation, auth} = this.props;

    if (auth.isAuthenticated) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signup: (email, password) => dispatch(authActions.dbSignUp(email, password)),
    resetPassword: (email, password) => dispatch(authActions.dbResetPassword(email, password)),
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
)(LoadingScreen);
