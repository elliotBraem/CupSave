import * as ACTIONS from '../src/store/actions/auth';
import TYPES from '../src/constants/auth';

// login
describe('actions', () => {
  it('should create an action to auth login', () => {
    const user = {};
    const expectedAction = {
      payload: user,
      type: TYPES.AUTH_LOGIN,
    };
    expect(ACTIONS.login(user)).toEqual(expectedAction);
  });
});

// updateProfile
describe('actions', () => {
  it('should allow user to update profile information', () => {
    const user = {};
    const expectedAction = {
      payload: user,
      type: TYPES.AUTH_USERS_UPDATE,
    };
    expect(ACTIONS.updateProfile(user)).toEqual(expectedAction);
  });
});

// resetPassword
describe('actions', () => {
  it('should reset password for account', () => {
    const expectedAction = {
      type: TYPES.AUTH_RESET,
    };
    expect(ACTIONS.resetPassword()).toEqual(expectedAction);
  });
});

// logout
describe('actions', () => {
  it('should logout of account', () => {
    const expectedAction = {
      type: TYPES.AUTH_RESET,
    };
    expect(ACTIONS.logout()).toEqual(expectedAction);
  });
});

// getUserData
describe('actions', () => {
  it('should fetch the users data', () => {
    const user = {};
    const expectedAction = {
      payload: user,
      type: TYPES.AUTH_USER_SET,
    };
    expect(ACTIONS.getUserData(user)).toEqual(expectedAction);
  });
});

// authLoading
describe('actions', () => {
  it('should create an action to auth loading', () => {
    const expectedAction = {
      type: TYPES.AUTH_LOADING,
    };
    expect(ACTIONS.authLoading()).toEqual(expectedAction);
  });
});

// authError
describe('actions', () => {
  it('should create an action to auth error', () => {
    const message = '';
    const expectedAction = {
      payload: message,
      type: TYPES.AUTH_ERROR,
    };
    expect(ACTIONS.authError(message)).toEqual(expectedAction);
  });
});
