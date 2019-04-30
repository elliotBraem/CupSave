import * as ACTIONS from '../src/store/actions/auth';
import TYPES from '../src/constants/auth';

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
