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
        const newBadges = [...state.badgeList, ...payload];

        draft.badgeList = newBadges.filter((badge, index, self) => index === self.findIndex(c => c._id === badge._id));

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
