import produce from 'immer';

export class UsersState {
  isLoaded = false;

  error = null;

  userMap = {};
}

export const usersReducer = (state = new UsersState(), action) => {
  const {payload} = action;
  switch (action.type) {
    case 'USERS_UPDATE': {
      return produce(state, draft => {
        draft.userMap[payload.email] = payload.user;
        draft.isLoaded = true;
      });
    }

    case 'USERS_ERROR': {
      return produce(state, draft => {
        draft.error = payload;
        draft.isLoaded = true;
      });
    }

    case 'USERS_LOADING': {
      return produce(state, draft => {
        draft.isLoaded = false;
      });
    }

    case 'USERS_RESET': {
      return new UsersState();
    }

    default:
      return state;
  }
};
