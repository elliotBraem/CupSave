/* global window */
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to AsyncStorage for react-native

import createRootReducer from './reducers';
import {version} from '../../package.json';

export default function configureStore(initialState = {}) {
  // Attach version number to the window
  window.version = version;

  // Middleware configuration
  const middleware = [thunk];

  // Redux Persist config
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['status'],
  };

  // Store initialization
  const persistedReducer = persistReducer(persistConfig, createRootReducer());
  const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

  // Setup Store Persistor
  const persistor = persistStore(store);

  return {store, persistor};
}
