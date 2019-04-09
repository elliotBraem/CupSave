import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, View} from 'react-native';
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

class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Home',
  };

  state = {currentUser: null};

  componentDidMount() {
    const {currentUser} = this.props.firebase.auth();
    this.setState({currentUser});
  }

  render() {
    const {navigation} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Home</Text>
        <View style={styles.buttons}>
          <Text>Hi {this.state.currentUser && this.state.currentUser.email}!</Text>
          <Button onPress={() => this.props.navigation.openDrawer()} style={styles.button}>
            Menu
          </Button>
          <Button onPress={() => this.props.firebase.logout()} style={styles.btnStyle}>
            Logout
          </Button>
        </View>
      </View>
    );
  }
}

export default withFirebase(HomeScreen);
