import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';
import {Button} from 'nachos-ui';

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 15,
    justifyContent: 'center',
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
          <Button onPress={() => navigation.openDrawer()} style={styles.button}>
            Open drawer
          </Button>
          <Button onPress={() => navigation.navigate('Home')} style={styles.button}>
            Go back
          </Button>
        </View>
      </View>
    );
  }
}

export default withFirebase(LoginScreen);
