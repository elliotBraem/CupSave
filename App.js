/* global window */
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppRegistry} from 'react-native';

import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import {firebaseConfig, reactReduxFirebaseConfig} from './src/constants/firebase';
import configureStore from './src/store/configureStore';
import Loading from './src/components/Loading';
import AppContainer from './src/navigation/AppNavigation';

const initialState = window.__INITIAL_STATE__ || {
  firebase: {
    authError: null,
  },
};

const {store, persistor} = configureStore(initialState);

// Initialize Firebase
// Initialize Firebase only if an fbInstance was not passed to the window (tests)
if (!window.fbInstance) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize firestore service on firebase instance
firebase.firestore();

const App = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      config={reactReduxFirebaseConfig}
      dispatch={store.dispatch}
      firebase={firebase}
      createFirestoreInstance={createFirestoreInstance}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </ReactReduxFirebaseProvider>
  </Provider>
);

AppRegistry.registerComponent('CupSave', () => App, false);

export default App;
