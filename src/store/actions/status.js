import ErrorMessages from '../../constants/errors';

/**
 * Show Error
 */
export default function(dispatch, type, val) {
  return new Promise((resolve, reject) => {
    // Validate types
    const allowed = ['error', 'success', 'info', 'loading'];

    if (allowed.indexOf(type) === -1) {
      return reject(
        new Error(
          `Error: Received "${type}". Type should be one of loading, success, error or info.`
        )
      );
    }

    // Set some defaults for convenience
    let message = val;
    if (!val || val === '' || (type !== 'loading' && val && val.trim() === '')) {
      if (type === 'success') {
        message = 'Success';
      }

      if (type === 'error') {
        message = ErrorMessages.default;
      }

      if (type === 'info') {
        message = ErrorMessages.defaultInfo;
      }

      // Set the loading bool
      if (type === 'loading' && val !== false) {
        message = true;
      }
    }

    return resolve(
      dispatch({
        type: 'STATUS_UPDATE',
        [type]: message,
      })
    );
  });
}
