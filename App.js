/* global window */
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {AppRegistry} from 'react-native';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import {firebaseConfig, reactReduxFirebaseConfig} from './src/constants/firebase';
import configureStore from './src/store/configureStore';
import Loading from './src/components/Loading';
import AppContainer from './src/navigation';

const initialState = window.__INITIAL_STATE__ || {
  firebase: {
    authError: null,
  },
};

const {store, persistor} = configureStore(initialState);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider config={reactReduxFirebaseConfig} dispatch={store.dispatch} firebase={firebase}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </ReactReduxFirebaseProvider>
  </Provider>
);

AppRegistry.registerComponent('CupSave', () => App, false);

export default App;
