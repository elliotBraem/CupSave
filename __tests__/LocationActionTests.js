import * as ACTIONS from '../src/store/actions/locations';
import TYPES from '../src/constants/locations';

// getLocations
describe('actions', () => {
  it('should get locations', () => {
    const locations = {};
    const expectedAction = {
      payload: locations,
      type: TYPES.LOCATIONS_UPDATE,
    };
    expect(ACTIONS.getLocations(locations)).toEqual(expectedAction);
  });
});

// locationsLoading
describe('actions', () => {
  it('should load locations', () => {
    const expectedAction = {
      type: TYPES.LOCATIONS_LOADING,
    };
    expect(ACTIONS.locationsLoading()).toEqual(expectedAction);
  });
});

// locationsError
describe('actions', () => {
  it('should present error', () => {
    const message = '';
    const expectedAction = {
      payload: message,
      type: TYPES.LOCATIONS_ERROR,
    };
    expect(ACTIONS.locationsError(message)).toEqual(expectedAction);
  });
});
