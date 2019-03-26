import React from 'react';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

import HomeContainer from '../screens/Home';
import LoginContainer from '../screens/Login';
import COLORS from '../constants/colors';

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

const Sidebar = createDrawerNavigator(
  {
    Home: HomeStack,
    Login: LoginStack,
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
