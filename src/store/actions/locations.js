import {provider} from '../../provider';

const locationsService = provider.createLocationsService();

export const getLocations = locations => {
  return {
    type: 'LOCATIONS_UPDATE',
    payload: locations,
  };
};

export const locationsLoading = () => {
  return {
    type: 'LOCATIONS_LOADING',
  };
};

export const locationsError = message => {
  return {
    type: 'LOCATIONS_ERROR',
    payload: message,
  };
};

/**
 * Get Locations
 */
export function dbGetLocations() {
  return async (dispatch, getState) => {
    dispatch(locationsLoading());

    try {
      const locations = await locationsService.getAllLocations();

      return dispatch(getLocations(locations));
    } catch (error) {
      return dispatch(locationsError(error.message));
    }
  };
}
