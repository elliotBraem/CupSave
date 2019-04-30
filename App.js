import React from 'react';
import {AppRegistry} from 'react-native';
import Root from './src';
import configureStore from './src/store/configureStore';

const {persistor, store} = configureStore();
// persistor.purge(); // Debug to clear persist

const App = () => {
  return <Root store={store} persistor={persistor} />;
};

export default App;

AppRegistry.registerComponent('CupSave', () => App, false);
