import {FBFirestore} from '..';
import ErrorMessages from '../../constants/errors';

export class UsersService {
  getUserData = email => {
    return new Promise((resolve, reject) => {
      const userProfileRef = FBFirestore.collection('users').where('email', '==', email);

      userProfileRef
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            // Contents of first document (only should be 1, emails are unique)
            const newUserData = querySnapshot.docs[0].data() || {};

            const user = {
              uid: querySnapshot.docs[0].id,
              email: newUserData.email || '',
              badges: newUserData.badges || {},
              consumption: newUserData.consumption || {},
              city: newUserData.city || '',
              level: newUserData.level || 0,
              friends: newUserData.friends || {},
              signed_up: newUserData.signed_up || 0,
              cupVolumeOz: newUserData.cup_volume_oz || 0,
            };

            return resolve(user);
          }
          return reject(new Error(ErrorMessages.default));
        })
        .catch(error => {
          throw error;
        });
    });
  };
}
