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
    type: 'AUTH_DETAILS_UPDATE',
    payload: user,
  };
};

export const resetPassword = () => {
  return {
    type: 'AUTH_RESET',
  };
};

export const updatePassword = () => {
  return {
    type: 'AUTH_DETAILS_UPDATE',
  };
};

export const updateEmail = () => {
  return {
    type: 'AUTH_DETAILS_UPDATE',
  };
};

export const logout = () => {
  return {
    type: 'AUTH_RESET',
  };
};

export const getUserData = user => {
  return {
    type: 'AUTH_DETAILS_SET',
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
    await dispatch(authLoading());

    try {
      const user = await authService.login(email, password);

      const userData = await userService.getUserData(user.email);

      await dispatch(getUserData(userData));

      if (!user.emailVerified) {
        console.log('Account email is not verified, new email sent.');
      }

      return dispatch(login(user));
    } catch (error) {
      return dispatch(authError(error.message));
    }
  };
}

/**
 * Login to Firebase with Email/Password
 */
export function dbFacebookLogin() {
  return async (dispatch, getState) => {
    await dispatch(authLoading());

    try {
      const user = await authService.loginWithFacebook();

      const userData = await userService.getUserData(user.email);

      await dispatch(getUserData(userData));

      return dispatch(login(user));
    } catch (error) {
      return dispatch(authError(error.message));
    }
  };
}

/**
 * Sign Up to Firebase
 */
export function dbSignUp(email, password) {
  return async (dispatch, getState) => {
    await dispatch(authLoading());

    try {
      await authService.signUp(email, password);

      const userData = await userService.getUserData(email);

      return dispatch(getUserData(userData));
    } catch (error) {
      return dispatch(authError(error.message));
    }
  };
}

/**
 * Logout
 */
export function dbLogout() {
  return async (dispatch, getState) => {
    await dispatch(authLoading());

    try {
      await authService.logout();
      return dispatch(logout());
    } catch (error) {
      return dispatch(authError(error.message));
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
 * Update Password
 */
export function dbUpdatePassword(newPassword) {
  return async (dispatch, getState) => {
    await dispatch(authLoading());

    try {
      await authService.updatePassword(newPassword);
      return dispatch(updatePassword());
    } catch (error) {
      return dispatch(authError(error.message));
    }
  };
}

/**
 * Update Email
 */
export function dbUpdateEmail(newEmail) {
  return async (dispatch, getState) => {
    await dispatch(authLoading());

    try {
      await authService.updateEmail(newEmail);
      return dispatch(updateEmail());
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
    await dispatch(authLoading());

    try {
      const user = await Firebase.auth().currentUser;

      if (user) {
        await authService.updateProfile(formData, user.uid);

        dispatch(updateProfile({...formData}));

        const userData = await userService.getUserData(user.email);

        return dispatch(getUserData(userData));
      }
      return dispatch(authError(ErrorMessages.default));
    } catch (error) {
      return dispatch(authError(error.message));
    }
  };
}

export function dbIncrementConsumption() {
  return async (dispatch, getState) => {
    await dispatch(authLoading());

    try {
      const user = await Firebase.auth().currentUser;

      if (user) {
        await authService.incrementConsumption(user.uid);

        const userData = await userService.getUserData(user.email);

        return dispatch(getUserData(userData));
      }
      return dispatch(authError(ErrorMessages.default));
    } catch (error) {
      return dispatch(authError(error.message));
    }
  };
}
