import {FBFirestore} from '../index';
import ErrorMessages from '../../constants/errors';

export class LocationsService {
  getAllLocations = () => {
    return new Promise((resolve, reject) => {
      // TODO: !!! CHANGE THIS to match current users city or something similar
      const locationRef = FBFirestore.collection('locations').limit(10);

      return locationRef
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const locations = [];

            querySnapshot.forEach(doc => {
              const location = doc.data() || {};

              if (doc.exists) {
                locations.push({
                  _id: doc.id,
                  address: location.address || '',
                  city: location.city || '',
                  latitude: location.latitude || 0,
                  longitude: location.longitude || 0,
                  name: location.name || '',
                  postalCode: location.postalCode || '',
                  state: location.state || '',
                });
              }
            });

            return resolve(locations);
          }
          return reject(new Error(ErrorMessages.default));
        })
        .catch(error => {
          throw error;
        });
    });
  };
}
