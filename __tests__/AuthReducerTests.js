import {authReducer, AuthState} from '../src/store/reducers/auth';
import TYPES from '../src/constants/auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      uid: '',
      emailVerified: false,
      providerId: '',
      displayName: '',
      email: '',
      avatarURL: '',
      phoneVerified: false,
      isAuthenticated: false,
      error: null,
      isLoaded: false,
      user: {},
    });
  });
  it('should handle AUTH_LOGIN', () => {
    expect(
      authReducer([], {
        type: TYPES.AUTH_LOGIN,
        payload: {
          uid: '123456789',
          providerId: '123456789',
          displayName: 'Test',
          email: 'test@test.com',
        },
      })
    ).toEqual({
      uid: '123456789',
      emailVerified: false,
      providerId: '123456789',
      displayName: 'Test',
      email: 'test@test.com',
      avatarURL: '',
      phoneVerified: false,
      isAuthenticated: true,
      error: null,
      isLoaded: true,
      user: {},
    });
  });
});
