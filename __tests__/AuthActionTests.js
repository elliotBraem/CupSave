import * as ACTIONS from '../src/store/actions/auth';
import * as ACTIONS2 from '../src/store/actions/badges';
import * as ACTIONS3 from '../src/store/actions/locations';
import * as ACTIONS4 from '../src/store/actions/users';
import TYPES from '../src/constants/auth';
import TYPES2 from '../src/constants/badges';
import TYPES3 from '../src/constants/locations';
import TYPES4 from '../src/constants/users';

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
      type: TYPES.AUTH_DETAILS_UPDATE,
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
      type: TYPES.AUTH_DETAILS_SET,
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

// getBadges
describe('actions', () => {
  it('', () => {
    const badges = {};
    const expectedAction = {
      payload: badges,
      type: TYPES2.BADGES_UPDATE,
    };
    expect(ACTIONS2.getBadges(badges)).toEqual(expectedAction);
  });
});

// badgesLoading
describe('actions', () => {
  it('', () => {
    const expectedAction = {
      type: TYPES2.BADGES_LOADING,
    };
    expect(ACTIONS2.badgesLoading()).toEqual(expectedAction);
  });
});

// badgesError
describe('actions', () => {
  it('', () => {
    const message = '';
    const expectedAction = {
      payload: message,
      type: TYPES2.BADGES_ERROR,
    };
    expect(ACTIONS2.badgesError(message)).toEqual(expectedAction);
  });
});

// getLocations
describe('actions', () => {
  it('', () => {
    const locations = {};
    const expectedAction = {
      payload: locations,
      type: TYPES3.LOCATIONS_UPDATE,
    };
    expect(ACTIONS3.getLocations(locations)).toEqual(expectedAction);
  });
});

// locationsLoading
describe('actions', () => {
  it('', () => {
    const expectedAction = {
      type: TYPES3.LOCATIONS_LOADING,
    };
    expect(ACTIONS3.locationsLoading()).toEqual(expectedAction);
  });
});

// locationsError
describe('actions', () => {
  it('', () => {
    const message = '';
    const expectedAction = {
      payload: message,
      type: TYPES3.LOCATIONS_ERROR,
    };
    expect(ACTIONS3.locationsError(message)).toEqual(expectedAction);
  });
});

// getUser (FAILS)
describe('actions', () => {
  it('', () => {
    const email = {};
    const user = {};
    const expectedAction = {
      payload: {email, user},
      type: TYPES4.USERS_UPDATE,
    };
    expect(ACTIONS4.getUser({email, user})).toEqual(expectedAction);
  });
});

// userLoading
describe('actions', () => {
  it('', () => {
    const expectedAction = {
      type: TYPES4.USERS_LOADING,
    };
    expect(ACTIONS4.userLoading()).toEqual(expectedAction);
  });
});

// userError
describe('actions', () => {
  it('', () => {
    const message = '';
    const expectedAction = {
      payload: message,
      type: TYPES4.USERS_ERROR,
    };
    expect(ACTIONS4.userError(message)).toEqual(expectedAction);
  });
});
