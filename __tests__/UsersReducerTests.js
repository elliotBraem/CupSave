import {usersReducer, UsersState} from '../src/store/reducers/users';

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual({
      isLoaded: false,
      error: null,
      userMap: {},
    });
  });
  it('should handle USERS_UPDATE', () => {
    expect(
      usersReducer({
        userMap: {'s@s.com': 'user2',}
      }, {
        type: 'USERS_UPDATE',
        payload: {
          user: 'user1',
          email: 't@t.com',
        },
      })
    ).toEqual({
      isLoaded: true,
      userMap: {'s@s.com': 'user2', 't@t.com': 'user1'},
    });
  });
  it('should handle USERS_ERROR', () => {
    expect(
      usersReducer([], {
        type: 'USERS_ERROR',
        payload: 'error here',
      })
    ).toEqual({
      isLoaded: true,
      error: 'error here',
    });
  });
  it('should handle USERS_LOADING', () => {
    expect(
      usersReducer([], {
        type: 'USERS_LOADING',
      })
    ).toEqual({
      isLoaded: false,
    });
  });
  it('should handle USERS_RESET', () => {
    expect(
      usersReducer([], {
        type: 'USERS_RESET',
      })).toEqual(new UsersState());
  });

});
