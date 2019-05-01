import {provider} from '../../provider';

const badgesService = provider.createBadgesService();

export const getBadges = badges => {
  return {
    type: 'BADGES_UPDATE',
    payload: badges,
  };
};

export const badgesLoading = () => {
  return {
    type: 'BADGES_LOADING',
  };
};

export const badgesError = message => {
  return {
    type: 'BADGES_ERROR',
    payload: message,
  };
};

/**
 * Get Badges
 */
export function dbGetBadges() {
  return async (dispatch, getState) => {
    dispatch(badgesLoading());

    try {
      const badges = await badgesService.getAllBadges();

      dispatch(getBadges(badges));
    } catch (error) {
      dispatch(badgesError(error.message));
    }
  };
}
