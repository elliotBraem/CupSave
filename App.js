import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Provider} from 'react-redux';
import createStore from './src/store';
import Home from './src/components/Home';

// Store Initialization
const initialState = window.__INITIAL_STATE__ || {
  firebase: {authError: null},
};

const store = createStore(initialState);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <Home />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
