import {combineReducers} from 'redux';
import {authReducer} from './auth';
import {badgesReducer} from './badges';
import {locationsReducer} from './locations';
import {usersReducer} from './users';

export default combineReducers({
  auth: authReducer,
  badges: badgesReducer,
  locations: locationsReducer,
  users: usersReducer,
});
