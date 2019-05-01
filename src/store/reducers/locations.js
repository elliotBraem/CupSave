import produce from 'immer';

export const LocationsState = {
  isLoaded: false,
  error: null,
  locationList: [],
};

export const locationsReducer = (state = LocationsState, action) => {
  const {payload} = action;
  return produce(state, draft => {
    switch (action.type) {
      case 'LOCATIONS_UPDATE': {
        draft.locationList = payload;
        draft.isLoaded = true;
        break;
      }

      case 'LOCATIONS_ERROR': {
        draft.error = payload;
        draft.isLoaded = true;
        break;
      }

      case 'LOCATIONS_LOADING': {
        draft.isLoaded = false;
        break;
      }

      case 'LOCATIONS_RESET': {
        return LocationsState;
      }

      default:
        return state;
    }
  });
};
