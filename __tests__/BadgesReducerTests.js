import {badgesReducer, BadgesState} from '../src/store/reducers/badges';

describe('badges reducer', () => {
  it('should return the initial state', () => {
    expect(badgesReducer(undefined, {})).toEqual({
      isLoaded: false,
      error: null,
      badgeList: [],
    });
  });
  it('should handle BADGES_UPDATE', () => {
    expect(
      badgesReducer({
        isLoaded: false,
        error: null,
        badgeList: ['oldBadge1', 'oldBades2'],
      }, {
        type: 'BADGES_UPDATE',
        payload: ['newBadge1', 'newBadge2'],
      })
    ).toEqual({
      isLoaded: true,
      error: null,
      badgeList: ['oldBadge1', 'oldBades2', 'newBadge1', 'newBadge2'],
    });
  });
  it('should handle BADGES_ERROR', () => {
    expect(
      badgesReducer([], {
        type: 'BADGES_ERROR',
        payload: 'error here',
      })
    ).toEqual({
      isLoaded: true,
      error: 'error here',
    });
  });
  it('should handle BADGES_LOADING', () => {
    expect(
      badgesReducer([], {
        type: 'BADGES_LOADING',
      })
    ).toEqual({
      isLoaded: false,
    });
  });
  it('should handle BADGES_RESET', () => {
    expect(
      badgesReducer([], {
        type: 'BADGES_RESET',
      })).toEqual(new BadgesState());
  });

});
