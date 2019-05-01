import React from 'react';
import {AppRegistry} from 'react-native';
import Root from './src';
import configureStore from './src/store/configureStore';

const {persistor, store} = configureStore();
// persistor.purge(); // un-comment and run to clear persisted redux data

const App = () => {
  return <Root store={store} persistor={persistor} />;
};

export default App;
console.ignoredYellowBox = ['Warning:'];
AppRegistry.registerComponent('CupSave', () => App, false);
