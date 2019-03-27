import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to AsyncStorage for react-native
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

export default function createRootReducer() {
  return combineReducers({
    // Add sync reducers here
    rehydrated,
    firebase: persistReducer(
      {
        key: 'firepersist',
        storage,
        stateReconciler: hardSet,
      },
      firebaseReducer
    ),
    status,
  });
}
