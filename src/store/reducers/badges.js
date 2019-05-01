import produce from 'immer';

export class BadgesState {
  isLoaded = false;

  error = null;

  badgeList = [];
}

export const badgesReducer = (state = new BadgesState(), action) => {
  const {payload} = action;
  switch (action.type) {
    case 'BADGES_UPDATE': {
      return produce(state, draft => {
        draft.badgeList = payload;
        draft.isLoaded = true;
      });
    }

    case 'BADGES_ERROR': {
      return produce(state, draft => {
        draft.error = payload;
        draft.isLoaded = true;
      });
    }

    case 'BADGES_LOADING': {
      return produce(state, draft => {
        draft.isLoaded = false;
      });
    }

    case 'BADGES_RESET': {
      return new BadgesState();
    }

    default:
      return state;
  }
};
