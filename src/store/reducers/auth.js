import produce from 'immer';

export class AuthState {
  uid = '';

  emailVerified = false;

  providerId = '';

  displayName = '';

  email = '';

  avatarURL = '';

  phoneVerified = false;

  isAuthenticated = false;

  error = null;

  isLoaded = false;

  user = {};
}

export const authReducer = (state = new AuthState(), action) => {
  const {payload} = action;
  switch (action.type) {
    case 'AUTH_LOGIN': {
      return produce(state, draft => {
        draft.uid = payload.uid;
        draft.providerId = payload.providerId;
        draft.displayName = payload.displayName;
        draft.email = payload.email;
        draft.isAuthenticated = true;
        draft.isLoaded = true;
      });
    }

    case 'AUTH_DETAILS_UPDATE': {
      return produce(state, draft => {
        draft.user = Object.assign(draft.user, payload);
        draft.isLoaded = true;
      });
    }

    case 'AUTH_DETAILS_SET': {
      return produce(state, draft => {
        draft.user = payload;
        draft.isLoaded = true;
      });
    }

    case 'AUTH_ERROR': {
      return produce(state, draft => {
        draft.error = payload;
        draft.isLoaded = true;
      });
    }

    case 'AUTH_LOADING': {
      return produce(state, draft => {
        draft.isLoaded = false;
      });
    }

    case 'AUTH_RESET': {
      return new AuthState();
    }

    default:
      return state;
  }
};
