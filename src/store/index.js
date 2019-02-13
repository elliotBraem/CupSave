/* global window */
import {applyMiddleware, compose, createStore} from 'redux';
import {persistCombineReducers, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage if web, AsyncStorage if react-native
import thunk from 'redux-thunk';
import reducers from './reducers';

export default (initialState = {}) => {
  // Redux Persist config
  const config = {
    key: 'root',
    storage,
    blacklist: ['status'],
  };

  // Middleware configuration
  const middleware = [thunk];

  // Store enhancers
  // const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = [];
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  // Store initialization
  const persistedReducer = persistCombineReducers(config, reducers);
  const store = createStore(
    persistedReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  const persistor = persistStore(store);

  return {persistor, store};
};
