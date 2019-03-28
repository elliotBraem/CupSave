import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
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
  icon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20
  }
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
        <Text style={styles.header}>First M. Last</Text>
        <View style={styles.buttons}>
          <Button onPress={() => navigation.openDrawer()} style={styles.button}>
            Menu
          </Button>
        </View>
      </View>
    );
  }
}

export default ProfileScreen;
