import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {createStackNavigator, createSwitchNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';
import {withFirebase} from 'react-redux-firebase';

import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/SignUp';
import ProfileScreen from '../screens/Profile';
import QRScannerScreen from '../screens/QRScanner';
import MapScreen from '../screens/Map';
import AboutUsScreen from '../screens/AboutUs';
import COLORS from '../constants/colors';
import LoadingScreen from '../screens/Loading';

// Stack for logged in user
const AppStack = createDrawerNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  QRScanner: QRScannerScreen,
  Map: MapScreen,
  AboutUs: AboutUsScreen,
});

// Stack for not logged in user
const AuthStack = createSwitchNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
  },
  {
    // Header for not logged in user
    defaultNavigationOptions: {
      header: null,
    },
  }
);

const DrawerNavigation = createStackNavigator(
  {
    DrawerStack: {screen: AppStack},
  },
  {
    headerMode: 'float',
    // Header for logged in user
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: 'transparent',
      },
      // headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: <Text onPress={() => navigation.toggleDrawer()}>Menu</Text>,
    }),
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: DrawerNavigation,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Loading',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
