export const Store = {};

export const initialState = Store;

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_LOGIN': {
      return state;
    }

    case 'AUTH_DETAILS_UPDATE': {
      return state;
    }

    case 'AUTH_LOGOUT': {
      return initialState;
    }

    default:
      return state;
  }
}
