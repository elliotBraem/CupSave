import Firebase from '../../data';
import ErrorMessages from '../../constants/errors';

import {provider} from '../../provider';

const authService = provider.createAuthService();
const userService = provider.createUsersService();

// REDUCERS
export const login = user => {
  return {
    type: 'AUTH_LOGIN',
    payload: user,
  };
};

export const updateProfile = user => {
  return {
    type: 'AUTH_USERS_UPDATE',
    payload: user,
  };
};

export const resetPassword = () => {
  return {
    type: 'AUTH_RESET',
  };
};

export const logout = () => {
  return {
    type: 'AUTH_RESET',
  };
};

export const getUserData = user => {
  return {
    type: 'AUTH_USER_SET',
    payload: user,
  };
};

export const authLoading = () => {
  return {
    type: 'AUTH_LOADING',
  };
};

export const authError = message => {
  return {
    type: 'AUTH_ERROR',
    payload: message,
  };
};

/**
 * Ensure token is up to date
 */
export function dbOnAuthorizeStateChange() {
  return (dispatch, getState) =>
    new Promise(resolve => {
      Firebase.auth().onAuthStateChanged(async loggedIn => {
        if (loggedIn) {
          const user = await Firebase.auth().currentUser;

          if (user) {
            // Update user data
            const userData = await userService.getUserData(user.email);
            dispatch(getUserData(userData));

            return resolve();
          }
        }

        return () => new Promise(() => resolve());
      });
    });
}

/**
 * Login to Firebase with Email/Password
 */
export function dbReauthenticate(password) {
  return async (dispatch, getState) => {
    try {
      const user = Firebase.auth().currentUser;

      // TODO: will this work with facebook? maybe get providerId from auth props object
      const cred = Firebase.auth.EmailAuthProvider.credential(user.email, password);
      return user.reauthenticateAndRetrieveDataWithCredential(cred);
    } catch (error) {
      return dispatch(authError(error.message));
    }
  };
}

/**
 * Login to Firebase with Email/Password
 */
export function dbLogin(email, password) {
  return async (dispatch, getState) => {
    dispatch(authLoading());

    try {
      const user = await authService.login(email, password);

      const userData = await userService.getUserData(user.email);

      if (!user.emailVerified) {
        console.log('Account email is not verified, new email sent.');
      }

      dispatch(getUserData(userData));

      dispatch(login(user));
    } catch (error) {
      dispatch(authError(error.message));
    }
  };
}

/**
 * Login to Firebase with Email/Password
 */
export function dbFacebookLogin() {
  return async (dispatch, getState) => {
    dispatch(authLoading());

    try {
      const user = await authService.loginWithFacebook();

      const userData = await userService.getUserData(user.email);

      dispatch(getUserData(userData));

      dispatch(login(user));
    } catch (error) {
      dispatch(authError(error.message));
    }
  };
}

/**
 * Sign Up to Firebase
 */
export function dbSignUp(email, password) {
  return async (dispatch, getState) => {
    dispatch(authLoading());

    try {
      await authService.signUp(email, password);

      const userData = await userService.getUserData(email);

      dispatch(getUserData(userData));
    } catch (error) {
      dispatch(authError(error.message));
    }
  };
}

/**
 * Logout
 */
export function dbLogout() {
  return async (dispatch, getState) => {
    dispatch(authLoading());

    try {
      authService.logout();
      dispatch(logout());
    } catch (error) {
      dispatch(authError(error.message));
    }
  };
}

/**
 * Reset Password
 */
export function dbResetPassword(email) {
  return async (dispatch, getState) => {
    await dispatch(authLoading());

    try {
      await authService.resetPassword(email);
      return dispatch(resetPassword());
    } catch (error) {
      return dispatch(authError(error.message));
    }
  };
}

/**
 * Update Profile
 */
export function dbUpdateProfile(formData) {
  return async (dispatch, getState) => {
    dispatch(authLoading());

    try {
      const user = await Firebase.auth().currentUser;
      authService.updateProfile(formData, user.uid);

      dispatch(updateProfile({...formData}));

      const userData = await userService.getUserData(user.email);

      dispatch(getUserData(userData));
    } catch (error) {
      dispatch(authError(error.message));
    }
  };
}

export function dbIncrementConsumption(drinkValue, locationEnabled) {
  return async (dispatch, getState) => {
    dispatch(authLoading());

    try {
      const user = await Firebase.auth().currentUser;

      if (user) {
        await authService.incrementConsumption(drinkValue, locationEnabled, user.uid);

        const userData = await userService.getUserData(user.email);

        dispatch(updateProfile(userData));
      }
    } catch (error) {
      dispatch(authError(error.message));
    }
  };
}

export function dbUpdateCupSize(newCupSize) {
  return async (dispatch, getState) => {
    dispatch(authLoading());

    try {
      const user = await Firebase.auth().currentUser;

      await authService.updateCupSize(newCupSize, user.uid);

      const userData = await userService.getUserData(user.email);

      dispatch(updateProfile(userData));
    } catch (error) {
      dispatch(authError(error.message));
    }
  };
}
