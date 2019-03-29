/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, View} from 'react-native';

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
  statDisplay: {
    padding: 15,
    column: 2,
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

class Stats extends Component {
  static navigationOptions = {
    title: 'Stats',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render(){
    const {navigation} = this.props;

    return <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Stats Page You Goddam Hero You</Text>
      <Text>It is here that we learn how much you have saved the earth from the tyrany that is
        disposable coffee cups</Text>
      <View style={styles.statDisplay}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
        <Text>test4</Text>
      </View>
    </View>;
  }
}

export default Stats;
