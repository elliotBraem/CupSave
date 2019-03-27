import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  buttons: {
    position: 'absolute',
    paddingBottom: 30,
    bottom: 0,
    paddingTop: 10,
    paddingHorizontal: 10,
    left: 0,
    flexDirection: 'row',
    right: 0,
    justifyContent: 'space-between',
  },
});

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired, // from withFirebase
    auth: PropTypes.object, // from withFirebase
  };

  render() {
    const {navigation, firebase} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login time</Text>
        <View style={styles.buttons}>
          <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
          <Button title="Go back" onPress={() => navigation.navigate('Home')} />
        </View>
      </View>
    );
  }
}

export default withFirebase(LoginScreen);
