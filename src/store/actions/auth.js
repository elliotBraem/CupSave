import statusMessage from './status';

/**
 * Login user
 */
const login = () => {
  return {
    type: 'AUTH_LOGIN',
  };
};

/**
 * Logout user
 */
const logout = () => {
  return {
    type: 'AUTH_LOGOUT',
  };
};

/**
 * User registration
 */
const signup = () => {
  return {
    type: 'AUTH_SIGNUP',
  };
};

/**
 * Update user's password
 */
const updatePassword = () => {
  return {
    type: 'AUTH_UPDATE_DETAILS',
  };
};

/**
 * Login user on firebase
 * @param email for logging in
 * @param password for logging in
 */
export const dbLogin = (email, password) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    statusMessage(dispatch, 'loading', true);

    return firebase
      .login({email, password})
      .then(() => {
        dispatch(login());

        statusMessage(dispatch, 'loading', false).then(statusMessage(dispatch, 'success', 'Logged in successfully.'));
      })
      .catch(err => {
        statusMessage(dispatch, 'loading', false).then(statusMessage(dispatch, 'error', err.message));
      });
  };
};
