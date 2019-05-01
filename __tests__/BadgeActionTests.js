import * as ACTIONS from '../src/store/actions/badges';
import TYPES from '../src/constants/badges';

// getBadges
describe('actions', () => {
  it('should get badges', () => {
    const badges = {};
    const expectedAction = {
      payload: badges,
      type: TYPES.BADGES_UPDATE,
    };
    expect(ACTIONS.getBadges(badges)).toEqual(expectedAction);
  });
});

// badgesLoading
describe('actions', () => {
  it('should load badges', () => {
    const expectedAction = {
      type: TYPES.BADGES_LOADING,
    };
    expect(ACTIONS.badgesLoading()).toEqual(expectedAction);
  });
});

// badgesError
describe('actions', () => {
  it('should present error', () => {
    const message = '';
    const expectedAction = {
      payload: message,
      type: TYPES.BADGES_ERROR,
    };
    expect(ACTIONS.badgesError(message)).toEqual(expectedAction);
  });
});
