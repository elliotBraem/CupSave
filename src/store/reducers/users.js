import produce from 'immer';

export const UsersState = {
  isLoaded: false,
  error: null,
  userMap: {},
};

export const usersReducer = (state = UsersState, action) => {
  const {payload} = action;
  return produce(state, draft => {
    switch (action.type) {
      case 'USERS_UPDATE': {
        draft.userMap[payload.email] = payload.user;
        draft.isLoaded = true;
        break;
      }

      case 'USERS_ERROR': {
        draft.error = payload;
        draft.isLoaded = true;
        break;
      }

      case 'USERS_LOADING': {
        draft.isLoaded = false;
        break;
      }

      case 'USERS_RESET': {
        return UsersState;
      }

      default:
        return state;
    }
  });
};
