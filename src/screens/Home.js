import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, View} from 'react-native';
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

  // static propTypes = {
  //   navigation: PropTypes.shape({
  //     openDrawer: PropTypes.func.isRequired,
  //     navigate: PropTypes.func.isRequired,
  //   }).isRequired,
  // };

  render() {
    const {navigation} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Home</Text>
        <View style={styles.buttons}>
          <Button onPress={() => this.props.navigation.openDrawer()} style={styles.button}>
            Menu
          </Button>
          <Button onPress={() => this.props.navigation.navigate('Login')} style={styles.btnStyle}>
            Login
          </Button>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
