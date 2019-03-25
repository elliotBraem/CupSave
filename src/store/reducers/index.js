import statusReducer from './status';
import {combineReducers} from 'redux';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export const createRootReducer = () =>
  combineReducers({
    rehydrated,
    status: statusReducer,
  });

export default createRootReducer;
