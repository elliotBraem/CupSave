import produce from 'immer';

export const AuthState = {
  uid: '',
  emailVerified: false,
  providerI: '',
  displayName: '',
  email: '',
  avatarURL: '',
  phoneVerified: false,
  isAuthenticated: false,
  error: null,
  isLoaded: false,
  user: null,
};

export const authReducer = (state = AuthState, action) => {
  return produce(state, draft => {
    const {payload} = action;
    switch (action.type) {
      case 'AUTH_LOGIN': {
        draft.uid = payload.uid;
        draft.providerId = payload.providerId;
        draft.displayName = payload.displayName;
        draft.email = payload.email;
        draft.isAuthenticated = true;
        draft.isLoaded = true;
        draft.user = {};
        break;
      }

      case 'AUTH_DETAILS_UPDATE': {
        draft.user = Object.assign({}, state.user, payload);
        draft.isLoaded = true;
        break;
      }

      case 'AUTH_DETAILS_SET': {
        draft.user = Object.assign({}, payload);
        draft.isLoaded = true;
        break;
      }

      case 'AUTH_ERROR': {
        draft.error = Object.assign({}, payload);
        draft.isLoaded = true;
        break;
      }

      case 'AUTH_LOADING': {
        draft.isLoaded = false;
        break;
      }

      case 'AUTH_RESET': {
        return AuthState;
      }

      default:
        return state;
    }
  });
};
