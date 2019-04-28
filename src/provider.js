// - Firebase services
import {AuthService, BadgesService, LocationsService, UsersService} from './data/services';

class ServicesProvider {
  createAuthService = () => {
    return new AuthService();
  };

  createBadgesService = () => {
    return new BadgesService();
  };

  createLocationsService = () => {
    return new LocationsService();
  };

  createUsersService = () => {
    return new UsersService();
  };
}

export const provider = new ServicesProvider();
