import {locationsReducer, LocationsState} from '../src/store/reducers/locations';

describe('locations reducer', () => {
  it('should return the initial state', () => {
    expect(locationsReducer(undefined, {})).toEqual({
      isLoaded: false,
      error: null,
      locationList: [],
    });
  });
  it('should handle BADGES_UPDATE', () => {
    expect(
      locationsReducer({
        isLoaded: false,
        error: null,
        locationList: ['oldBadge1', 'oldBades2'],
      }, {
        type: 'LOCATIONS_UPDATE',
        payload: ['newBadge1', 'newBadge2'],
      })
    ).toEqual({
      isLoaded: true,
      error: null,
      badgeList: ['oldBadge1', 'oldBades2', 'newBadge1', 'newBadge2'],
    });
  });
  it('should handle LOCATIONS_ERROR', () => {
    expect(
      locationsReducer([], {
        type: 'LOCATIONS_ERROR',
        payload: 'error here',
      })
    ).toEqual({
      isLoaded: true,
      error: 'error here',
    });
  });
  it('should handle LOCATIONS_LOADING', () => {
    expect(
      locationsReducer([], {
        type: 'LOCATIONS_LOADING',
      })
    ).toEqual({
      isLoaded: false,
    });
  });
  it('should handle LOCATIONS_RESET', () => {
    expect(
      locationsReducer([], {
        type: 'LOCATIONS_RESET',
      })).toEqual(new LocationsState());
  });
});
