import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';
import {Button} from 'nachos-ui';
import PasswordContainer from './Password';

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    alignSelf: 'center',
    marginBottom: 50,
    fontSize: 22,
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
  icon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 60,
    backgroundColor: 'black',
  },
});

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/profileicon.png')} style={styles.circle} />
        <Text style={styles.header}>First M. Last</Text>
        <View style={styles.buttons}>
          <Button onPress={() => navigation.openDrawer()} style={styles.button}>
            Menu
          </Button>
        </View>
        <View style={styles.buttons}>
          <Button onPress={() => navigation.navigate('Password')} style={styles.button}>
            Change Password
          </Button>
          <Button onPress={() => navigation.navigate('Password')} style={styles.button}>
            Change Email
          </Button>
        </View>
      </View>
    );
  }
}

export default ProfileScreen;
