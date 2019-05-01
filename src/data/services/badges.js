import {FBFirestore} from '../index';
import ErrorMessages from '../../constants/errors';

export class BadgesService {
  getAllBadges = () => {
    return new Promise((resolve, reject) => {
      const badgeRef = FBFirestore.collection('badges');

      return badgeRef
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const badges = [];

            querySnapshot.forEach(doc => {
              const badge = doc.data() || {};

              if (doc.exists) {
                badges.push({
                  _id: doc.id,
                  name: badge.name || '',
                  icon: badge.icon || '',
                  value: badge.value || 0,
                });
              }
            });
            return resolve(badges);
          }
          return reject(new Error(ErrorMessages.default));
        })
        .catch(error => {
          throw error;
        });
    });
  };
}
