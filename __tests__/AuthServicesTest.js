import FirebaseMock from '../jest/firebaseMock';
import Firebase from '../src/data/index';
import {provider} from '../src/provider';

const authService = provider.createAuthService();

describe('sign up', () => {
  it('signs up valid user', () => {
    Firebase.auth = FirebaseMock.auth;
    authService.signUp(('test@email.com', 'testPassword'));
    expect(Firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalledWith('test@email.com', 'testPassword');
  });

  // it('adds a timestamp, and writes it to the doc', () => {
  //   expect(firestore().doc().set).toHaveBeenCalledWith({
  //     created: 'MOCK_TIME',
  //     fake: 'data',
  //   });
  // });
});
