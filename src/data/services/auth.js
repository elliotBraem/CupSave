import ErrorMessages from '../../constants/errors';

import Firebase, {FirestoreRef} from '../index';
import REGEX from '../../constants/regex';

export class AuthService {
  signUp = (email, password) => {
    return new Promise((resolve, reject) => {
      // Go to Firebase
      return Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async resultOfUserCreation => {
          // Update profile
          if (resultOfUserCreation && resultOfUserCreation.user) {
            const {uid} = resultOfUserCreation.user;
            const currentTimeInUnixEpoch = new Date().valueOf();

            const isUniversity = new RegExp(REGEX.UNIVERSITY_EMAIL).test(email);

            const badges = {
              '6W2UJvCl9AKy3X97jhZ0': true, // Hello World badge
            };

            if (isUniversity) {
              badges.rJ7XjWH9a336tPj9caEB = true;
            }

            await FirestoreRef.collection('users')
              .doc(uid)
              .set({
                email,
                badges,
                consumption: {
                  total: 0,
                  most_recent_consumption: currentTimeInUnixEpoch,
                  history: {
                    [currentTimeInUnixEpoch]: 0,
                  },
                },
                city: '',
                level: 0,
                friends: {
                  byZi8ywta1hgA9oTc6YwHEDrrHU2: true, // Test user
                },
                cup_volume_oz: 16,
                signed_up: currentTimeInUnixEpoch,
              });

            // Do we want to return the result of user creation or something here?
            return resolve();
          }
          return reject(new Error(ErrorMessages.default));
        })
        .catch(error => {
          return reject(new Error(error.message));
        });
    }).catch(error => {
      throw error;
    });
  };

  /**
   * Login to Firebase with Email/Password
   */
  login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Go to Firebase
      return Firebase.auth()
        .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
        .then(() =>
          Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(async res => {
              const userDetails = res && res.user ? res.user : null;

              const currentTimeInUnixEpoch = new Date().valueOf();

              if (userDetails && userDetails.uid) {
                // Update last logged in data
                await FirestoreRef.collection('users')
                  .doc(userDetails.uid)
                  .update({
                    last_logged_in: currentTimeInUnixEpoch,
                  })
                  .catch(() => console.error('Failed to save last logged in time to database'));

                // Send verification Email when email hasn't been verified
                if (!userDetails.emailVerified && userDetails.providerId === 'email') {
                  await Firebase.auth()
                    .currentUser.sendEmailVerification()
                    .catch(() => console.error('Verification email failed to send'));
                }

                return resolve({
                  uid: userDetails.uid,
                  emailVerified: userDetails.emailVerified,
                  providerId: userDetails.providerId,
                  displayName: userDetails.displayName,
                  email: userDetails.email,
                  photoURL: userDetails.photoURL,
                });
              }
              return reject(new Error(ErrorMessages.default));
            })
            .catch(error => {
              throw error;
            })
        );
    });
  };

  /**
   * Login to Firebase with Email/Password
   */
  loginWithFacebook = () => {
    return new Promise(async (resolve, reject) => {
      const {appId} = Expo.Constants.manifest.extra.facebook;
      const permissions = ['public_profile', 'email']; // required permissions

      const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {permissions});

      switch (type) {
        case 'success': {
          await Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.LOCAL);
          const credential = Firebase.auth.FacebookAuthProvider.credential(token);
          const facebookProfile = await Firebase.auth().signInAndRetrieveDataWithCredential(credential);

          // do things with user's facebook profile data here
          const userRef = FirestoreRef.collection('users').where('email', '==', facebookProfile.user.email);
          const {email} = facebookProfile.user;
          userRef.get().then(async querySnapshot => {
            if (!querySnapshot.empty) {
              // Contents of first document (only should be 1, emails are unique)
              return resolve({email});
            }
            const uid = facebookProfile.user.uid;
            const currentTimeInUnixEpoch = new Date().valueOf();

            const isUniversity = new RegExp(REGEX.UNIVERSITY_EMAIL).test(email);

            const badges = {
              '6W2UJvCl9AKy3X97jhZ0': true, // Hello World badge
            };

            if (isUniversity) {
              badges.rJ7XjWH9a336tPj9caEB = true;
            }

            await FirestoreRef.collection('users')
              .doc(uid)
              .set({
                email,
                badges,
                consumption: {
                  total: 0,
                  most_recent_consumption: currentTimeInUnixEpoch,
                  history: {
                    [currentTimeInUnixEpoch]: 0,
                  },
                },
                city: '',
                level: 0,
                friends: {
                  byZi8ywta1hgA9oTc6YwHEDrrHU2: true, // Test user
                },
                cup_volume_oz: 16,
                signed_up: currentTimeInUnixEpoch,
              });
            return resolve({email});
          });
        }
        case 'cancel': {
          throw new Error('Error: something went wrong');
        }
      }
    });
  };

  logout = () => {
    return new Promise((resolve, reject) => {
      Firebase.auth()
        .signOut()
        .then(() => {
          return resolve();
        })
        .catch(error => {
          throw error;
        });
    });
  };

  resetPassword = email => {
    return new Promise((resolve, reject) => {
      // Go to Firebase
      return Firebase.auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          return resolve();
        })
        .catch(error => {
          // An error happened.
          throw new Error(error.message);
        });
    });
  };

  updateProfile = (formData, uid) => {
    const {email, password, changeEmail, changePassword} = formData;

    return new Promise((resolve, reject) => {
      // Go to Firebase
      return FirestoreRef.collection('users')
        .doc(uid)
        .update({
          email,
        })
        .then(async () => {
          // Update Email address
          if (changeEmail && Firebase.auth().currentUser !== null) {
            await Firebase.auth()
              .currentUser.updateEmail(email)
              .catch(error => {
                reject(new Error(error.message));
              });
          }

          // Change the password
          if (changePassword && Firebase.auth().currentUser !== null) {
            await Firebase.auth()
              .currentUser.updatePassword(password)
              .catch(error => {
                reject(new Error(error.message));
              });
          }

          return resolve();
        })
        .catch(error => {
          throw error;
        });
    });
  };

  incrementConsumption = (drinkValue, locationEnabled, uid) => {
    return new Promise((resolve, reject) => {
      const userRef = FirestoreRef.collection('users').doc(uid);

      const currentTimeInUnixEpoch = new Date().valueOf();

      let long = 0;
      let lat = 0;

      // Get the location of user if enabled
      if (locationEnabled) {
        navigator.geolocation.getCurrentPosition(
          position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
          },
          err => console.log(err)
        );
      }

      return FirestoreRef.runTransaction(async transaction => {
        return transaction
          .get(userRef)
          .then(doc => {
            // If the document doesn't exist, this is the first consumption, set it to 1
            const newTotal = doc.exists ? doc.data().consumption.total + 1 : 1;

            const data = {
              consumption: {
                total: newTotal,
                most_recent_consumption: currentTimeInUnixEpoch,
                history: {
                  [currentTimeInUnixEpoch]: {
                    consumptionNumber: newTotal,
                    time: currentTimeInUnixEpoch,
                    drink: drinkValue,
                    location: {
                      longitude: long,
                      latitude: lat,
                    },
                  },
                },
              },
            };

            transaction.set(userRef, data, {merge: true});
          })
          .then(() => resolve());
      });
    }).catch(error => {
      throw error;
    });
  };

  updateCupSize = (newCupSize, uid) => {
    return new Promise((resolve, reject) => {
      const userRef = FirestoreRef.collection('users').doc(uid);

      return FirestoreRef.runTransaction(async transaction => {
        return transaction
          .get(userRef)
          .then(doc => {
            // If the document doesn't exist, this is the first consumption, set it to 1
            const data = {
              cup_volume_oz: newCupSize,
            };

            transaction.set(userRef, data, {merge: true});
          })
          .then(() => resolve());
      });
    }).catch(error => {
      throw error;
    });
  };
}
