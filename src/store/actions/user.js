import statusMessage from './status';

export function getUser(userData) {
  return async dispatch =>
    new Promise(async (resolve, reject) => {
      await statusMessage(dispatch, 'loading', true);
      dispatch({
        type: 'USER_UPDATE',
        payload: {...userData},
      });
      await statusMessage(dispatch, 'loading', false);
    }).catch(async error => {
      statusMessage(dispatch, 'loading', false);
      statusMessage(dispatch, 'error', error.message);
    });
}
