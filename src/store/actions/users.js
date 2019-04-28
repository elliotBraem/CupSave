import {provider} from '../../provider';

const userService = provider.createUsersService();

export const getUser = (email, user) => {
  return {
    type: 'USERS_UPDATE',
    payload: {email, user},
  };
};

export const userLoading = () => {
  return {
    type: 'USERS_LOADING',
  };
};

export const userError = message => {
  return {
    type: 'USERS_ERROR',
    payload: message,
  };
};

export function dbGetUser(email) {
  return async (dispatch, getState) => {
    await dispatch(userLoading());

    try {
      const userData = await userService.getUserData(email);

      return dispatch(getUser(email, userData));
    } catch (error) {
      return dispatch(userError(error.message));
    }
  };
}
