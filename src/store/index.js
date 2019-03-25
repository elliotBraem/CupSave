/* global window */
import {applyMiddleware, createStore} from 'redux';
import RNFirebase from 'react-native-firebase';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import {createRootReducer} from './reducers';

const reactNativeFirebaseConfig = {
  debug: true,
};

// for more config options, visit http://docs.react-redux-firebase.com/history/v2.0.0/docs/api/compose.html
const reduxFirebaseConfig = {
  userProfile: 'users', // save users profiles to 'users' collection
};

export default function configureStore(initialState = {firebase: {}}) {
  const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);

  // Middleware configuration
  const middleware = [
    // make getFirebase available in third argument of thunks
    thunk.withExtraArgument({getFirebase}),
  ];

  // Store initialization
  const store = createStore(
    createRootReducer(),
    initialState,
    composeWithDevTools(
      reactReduxFirebase(firebase, reduxFirebaseConfig), // pass initialized react-native-firebase app instance
      applyMiddleware(...middleware)
    )
  );

  return store;
}
