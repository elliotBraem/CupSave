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
    await dispatch(badgesLoading());

    try {
      const badges = await badgesService.getAllBadges();

      return dispatch(getBadges(badges));
    } catch (error) {
      return dispatch(badgesError(error.message));
    }
  };
}
