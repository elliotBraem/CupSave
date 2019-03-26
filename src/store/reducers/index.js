import {combineReducers} from 'redux';
import {firebaseStateReducer as firebase} from 'react-redux-firebase';
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
  firebase,
  status,
});

export default rootReducer;
