import React from 'react';
import {createSwitchNavigator, createDrawerNavigator} from 'react-navigation';

import HomeContainer from '../screens/Home';
import LoginContainer from '../screens/Login';
import ProfileContainer from '../screens/Profile';
import COLORS from '../constants/colors';

/* eslint-disable react/prop-types */
const LoginStack = createSwitchNavigator({
  Login: {
    path: '/login',
    screen: ({navigation}) => <LoginContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'Login',
    },
  },
});
/* eslint-enable react/prop-types */

const Sidebar = createDrawerNavigator(
  {
    Login: LoginStack,
  },
  {
    initialRouteName: 'Login',
    drawerWidth: 250,
    navigationOptions: {
      header: null,
    },
    contentOptions: {
      activeTintColor: COLORS.primary,
    },
  }
);

export default Sidebar;
