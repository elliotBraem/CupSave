import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: AsyncStorage
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Redux Persist config
const config = {
  key: 'root',
  storage,
};

export default function configureStore(initialState = {}) {
  // Middleware configuration
  const middleware = [thunk];

  // Store enhancers
  const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

  // Store initialization
  const persistedReducer = persistReducer(config, rootReducer);

  const store = createStore(persistedReducer, initialState, composedEnhancers);

  const persistor = persistStore(store);

  return {store, persistor};
}
