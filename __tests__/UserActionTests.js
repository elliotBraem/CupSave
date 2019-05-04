import * as ACTIONS from '../src/store/actions/users';
import TYPES from '../src/constants/users';

// getUser (FAILS)
describe('actions', () => {
  it('should get user', () => {
    const email = {};
    const user = {};
    const expectedAction = {
      payload: {email, user},
      type: TYPES.USERS_UPDATE,
    };
    expect(ACTIONS.getUser({email, user})).toEqual(expectedAction);
  });
});

// userLoading
describe('actions', () => {
  it('should load user', () => {
    const expectedAction = {
      type: TYPES.USERS_LOADING,
    };
    expect(ACTIONS.userLoading()).toEqual(expectedAction);
  });
});

// userError
describe('actions', () => {
  it('should present error', () => {
    const message = '';
    const expectedAction = {
      payload: message,
      type: TYPES.USERS_ERROR,
    };
    expect(ACTIONS.userError(message)).toEqual(expectedAction);
  });
});
