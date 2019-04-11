import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {withFirebase} from 'react-redux-firebase';

const styles = StyleSheet.create({});

class SettingsScreen extends Component {
  // Any props you are taking in (I think it should only need firebase)
  static propTypes = {};

  // Items you will need to store in this screen's state,
  // almost like a public static variable. This is where you would initialize it.
  state = {};

  render() {
    return (
      <View>
        <Text>Maybe a form for changing email and password here</Text>
      </View>
    );
  }
}

export default withFirebase(SettingsScreen);
