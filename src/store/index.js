/* global window */
import {applyMiddleware, createStore} from 'redux';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to AsyncStorage for react-native

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import rootReducer from './reducers';
import {firebaseConfig, reactReduxFirebaseConfig} from '../constants/firebase';
import {version} from '../../package.json';

export default function configureStore(initialState = {}) {
  // Attach version number to the window
  window.version = version;

  // Middleware configuration
  const middleware = [
    thunk.withExtraArgument({getFirebase}), // make getFirebase available in third argument of thunks
    createLogger({collapsed: true}),
  ];

  // Redux Persist config
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['status'],
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Store initialization
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(
      reactReduxFirebase(firebase, reactReduxFirebaseConfig), // pass initialized react-native-firebase app instance
      applyMiddleware(...middleware)
    )
  );

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(persistedReducer);
  //   });
  // }

  // Setup Store Persistor
  const persistor = persistStore(store);

  return {store, persistor};
}
