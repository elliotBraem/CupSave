import {combineReducers} from 'redux';
import {firebaseStateReducer as firebase} from 'react-redux-firebase';
import {persistReducer} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

// Reducers
import status from './status';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  rehydrated,
  firebase: persistReducer(
    {key: 'firepersist', storage: localStorage, stateReconciler: hardSet},
    firebase
  ),
  status,
});

export default rootReducer;
