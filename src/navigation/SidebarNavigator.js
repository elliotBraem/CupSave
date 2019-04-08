/* eslint-disable prettier/prettier */
import React from 'react';
import {createSwitchNavigator, createDrawerNavigator, createStackNavigator} from 'react-navigation';

import HomeContainer from '../screens/Home';
import LoginContainer from '../screens/Login';
import StatContainer from '../screens/Stats';
import ProfileContainer from '../screens/Profile';
import SignUpContainer from '../screens/SignUp';
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
  SignUp: {
    path: '/signup',
    screen: ({navigation}) => <SignUpContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'SignUp',
    },
  },
});


const StatStack = createStackNavigator({
  Stats: {
    path: '/stats',
    screen: ({navigation}) => <StatContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'Stats',
    },
  },
});
/* eslint-enable react/prop-types */

const Sidebar = createDrawerNavigator(
  {
    Login: LoginStack,
    Stats: StatStack,
  },
  {
    initialRouteName: 'Login',
    drawerWidth: 250,
    // navigationOptions: {
    //   header: null,
    // },
    contentOptions: {
      activeTintColor: COLORS.primary,
    },
  }
);

export default Sidebar;
