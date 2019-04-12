import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {withFirebase} from 'react-redux-firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class LoadingScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    firebase: PropTypes.shape({
      auth: PropTypes.shape.isRequired,
    }).isRequired, // from withFirebase
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {firebase, navigation} = this.props;
    firebase.auth.onAuthStateChanged(user => {
      navigation.navigate(user ? 'App' : 'Auth');
    });
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

export default withFirebase(LoadingScreen);
