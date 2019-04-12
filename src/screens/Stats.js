/* eslint-disable prettier/prettier */
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
  statContainer: {
    flexDirection: 'row',
  },
  statColumn: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  stat: {
    width: '50%',
    height: 50,
    flexDirection: 'row',
  },
  statName:{
    flex: 2
  },
  statItem:{
    flex:3,
   alignItems: 'center',
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
      <View style={styles.buttons}>
        <Button onPress={() => navigation.openDrawer()} style={styles.button}>
          Menu
        </Button>
      </View>
      <View style={styles.statColumn}>
          <View style={styles.stat}>
            <View style={styles.statName}><Text>Cups Saved</Text></View>
            <View style={styles.statItem}><Text>5,000</Text></View>
          </View>
          <View style={styles.stat}>
            <View style={styles.statName}><Text>Lbs Waste Saved</Text></View>
            <View style={styles.statItem}><Text>40</Text></View>
          </View>
          <View style={styles.stat}>
            <View style={styles.statName}><Text>Lbs C02 kept out of atmosphere</Text></View>
            <View style={styles.statItem}><Text>4</Text></View>
          </View>
          <View style={styles.stat}>
            <View style={styles.statName}><Text>Turtles Saved</Text></View>
            <View style={styles.statItem}><Text>0</Text></View>
          </View>
      </View>
    </View>;
  }
}

export default Stats;
