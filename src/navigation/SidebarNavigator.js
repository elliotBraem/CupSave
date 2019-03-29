/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

import HomeContainer from '../screens/Home';
import LoginContainer from '../screens/Login';
import StatContainer from '../screens/Stats';
import COLORS from '../constants/colors';

/* eslint-disable react/prop-types */
const HomeStack = createStackNavigator({
  Home: {
    path: '/',
    screen: ({navigation}) => <HomeContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
});

const LoginStack = createStackNavigator({
  Login: {
    path: '/login',
    screen: ({navigation}) => <LoginContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'Login',
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
    Home: HomeStack,
    Login: LoginStack,
    Stats: StatStack,
  },
  {
    initialRouteName: 'Home',
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
