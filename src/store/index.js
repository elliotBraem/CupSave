/* global window */
import {applyMiddleware, createStore} from 'redux';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import rootReducer from './reducers';
import {firebaseConfig, reactReduxFirebaseConfig} from '../constants/firebase';

export default function configureStore(initialState = {firebase: {}}) {
  // Initialize Firebase instance
  firebase.initializeApp(firebaseConfig);

  // Middleware configuration
  const middleware = [
    // make getFirebase available in third argument of thunks
    thunk.withExtraArgument({getFirebase}),
  ];

  // Store initialization
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      reactReduxFirebase(firebase, reactReduxFirebaseConfig), // pass initialized react-native-firebase app instance
      applyMiddleware(...middleware)
    )
  );

  // TODO: maybe not need? ---------
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer());
    });
  }
  // -------------------------------

  return store;
}
