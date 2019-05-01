import produce from 'immer';

export const BadgesState = {
  isLoaded: false,
  error: null,
  badgeList: [],
};

export const badgesReducer = (state = BadgesState, action) => {
  const {payload} = action;
  return produce(state, draft => {
    switch (action.type) {
      case 'BADGES_UPDATE': {
        draft.badgeList = payload;
        draft.error = null;
        draft.isLoaded = true;
        break;
      }

      case 'BADGES_ERROR': {
        draft.error = payload;
        draft.isLoaded = true;
        break;
      }

      case 'BADGES_LOADING': {
        draft.isLoaded = false;
        break;
      }

      case 'BADGES_RESET': {
        return BadgesState;
      }

      default:
        return state;
    }
  });
};
