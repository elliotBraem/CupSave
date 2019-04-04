import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Sidebar from './SidebarNavigator';
import ProfileSidebar from './ProfileSidebarNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Main: Sidebar,
      ProfileMain: ProfileSidebar,
    },
    {
      initialRouteName: 'Main'
    },
    {
      headerMode: 'none',
    }
  )
);
