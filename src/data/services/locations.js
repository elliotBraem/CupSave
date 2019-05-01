/* global isNaN */
import {FBFirestore} from '../index';
import ErrorMessages from '../../constants/errors';
import {getGeometricBoundingBox} from '../../utils/geoCalculations';

export class LocationsService {
  getSurroundingLocations = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      const locationRef = FBFirestore.collection('locations');

      const bounds = getGeometricBoundingBox(latitude, longitude, 50);

      if (
        isNaN(bounds.latitudeMin) ||
        isNaN(bounds.latitudeMax) ||
        isNaN(bounds.longitudeMin) ||
        isNaN(bounds.longitudeMax)
      ) {
        return reject(new Error(ErrorMessages.default));
      }

      // Bounds checking for Latitude
      const queryForNearbyLocations = locationRef
        .where('latitude', '>=', bounds.latitudeMin)
        .where('latitude', '<=', bounds.latitudeMax);

      return queryForNearbyLocations
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const locations = [];

            querySnapshot.forEach(doc => {
              const location = doc.data() || {};

              // Bounds checking for Longitude
              if (location.longitude >= bounds.longitudeMin && location.longitude <= bounds.longitudeMax) {
                locations.push({
                  _id: doc.id,
                  address: location.address || '',
                  city: location.city || '',
                  latitude: location.latitude,
                  longitude: location.longitude,
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
          return reject(new Error(ErrorMessages.default));
        });
    }).catch(error => {
      throw error;
    });
  };
}
