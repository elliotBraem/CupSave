import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Text, StyleSheet, View} from 'react-native';

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

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
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
        <Text style={styles.header}>Hello</Text>
        <View style={styles.buttons}>
          <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
          <Button title="To Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    );
  }
}
