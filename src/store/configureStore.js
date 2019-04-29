import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import {persistCombineReducers, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: AsyncStorage
import thunk from 'redux-thunk';
import reducers from './reducers';

export default function configureStore(initialState = {}) {
  // Redux Persist config
  const config = {
    key: 'root',
    storage,
    blacklist: ['locations'], // Too many locations for AsyncStorage
  };

  // Middleware configuration
  const middleware = [thunk];

  // Store enhancers
  const enhancers = [];
  const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers);

  // Store initialization
  const persistedReducer = persistCombineReducers(config, reducers);

  const store = createStore(persistedReducer, initialState, composedEnhancers);

  const persistor = persistStore(store);

  return {store, persistor};
}
