import Store from '../user';

export const initialState = Store;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_UPDATE': {
      // Pick out the props I need
      // if (action.data && typeof action.data === 'object') { }

      return {
        // ...state,
        isLoaded: true,
        user: action.data,
      };
    }

    default:
      return state;
  }
};
