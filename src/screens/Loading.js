import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export class LoadingScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
    }).isRequired,
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

const mapStateToProps = (state, ownProps) => {
  const auth = state.auth || {};

  return {
    auth,
  };
};

export default connect(mapStateToProps)(LoadingScreen);
