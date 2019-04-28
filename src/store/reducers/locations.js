import produce from 'immer';

export class LocationsState {
  isLoaded = false;

  error = null;

  locationList = [];
}

export const locationsReducer = (state = new LocationsState(), action) => {
  const {payload} = action;
  switch (action.type) {
    case 'LOCATIONS_UPDATE': {
      return produce(state, draft => {
        const newLocations = [...state.locationList, ...payload];

        draft.locationList = newLocations.filter(
          (locations, index, self) => index === self.findIndex(c => c._id === locations._id)
        );

        draft.isLoaded = true;
      });
    }

    case 'LOCATIONS_ERROR': {
      return produce(state, draft => {
        draft.error = payload;
        draft.isLoaded = true;
      });
    }

    case 'LOCATIONS_LOADING': {
      return produce(state, draft => {
        draft.isLoaded = false;
      });
    }

    case 'LOCATIONS_RESET': {
      return new LocationsState();
    }

    default:
      return state;
  }
};
