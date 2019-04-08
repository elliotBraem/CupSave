import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from '../screens/Home';
import AuthLoadingScreen from '../screens/AuthLoading';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/SignUp';
import ProfileScreen from '../screens/Profile';
import QRScannerScreen from '../screens/QRScanner';
import MapScreen from '../screens/Map';
import AboutUsScreen from '../screens/AboutUs';
import COLORS from '../constants/colors';

// Stack for logged in user
const AppStack = createDrawerNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  QRScanner: QRScannerScreen,
  Map: MapScreen,
  AboutUs: AboutUsScreen,
  Login: LoginScreen,
});

// Stack for not logged in user
const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
  },
  {
    // headerMode: 'float',
    // Header for not logged in user
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTitle: 'You are not logged in',
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
        backgroundColor: 'blue',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: <Text onPress={() => navigation.toggleDrawer()}>Menu</Text>,
    }),
  }
);

const isLoggedIn = true;

const AppNavigator = isLoggedIn ? DrawerNavigation : AuthStack;

const AppContainer = createAppContainer(AppNavigator);

// Manifest of possible screens
// const PrimaryNav = createStackNavigator(
//   {
//     loginStack: {screen: LoginStack},
//     drawerStack: {screen: DrawerNavigation},
//   },
//   {
//     // Default config for all screens
//     headerMode: 'none',
//     title: 'Main',
//     initialRouteName: 'loginStack',
//   }
// );

// const ProfileStack = StackNavigator({
//   Profile: {
//     path: '/profile',
//     screen: ({navigation}) => <ProfileContainer navigation={navigation} />,
//     navigationOptions: {
//       drawerLabel: 'Profile',
//     },
//   },
// });

// const QRScannerStack = StackNavigator({
//   QRScanner: {
//     path: '/qrscanner',
//     screen: ({navigation}) => <QRContainer navigation={navigation} />,
//     navigationOptions: {
//       drawerLabel: 'QRScanner',
//     },
//   },
// });

// const MapStack = StackNavigator({
//   Map: {
//     path: '/map',
//     screen: ({navigation}) => <MapContainer navigation={navigation} />,
//     navigationOptions: {
//       drawerLabel: 'Map',
//     },
//   },
// });

// const AboutUsStack = StackNavigator({
//   AboutUs: {
//     path: '/aboutus',
//     screen: ({navigation}) => <AboutUsContainer navigation={navigation} />,
//     navigationOptions: {
//       drawerLabel: 'AboutUs',
//     },
//   },
// });
/* eslint-enable react/prop-types */

// const AppNavigation = createDrawerNavigator(
//   {
//     Home: HomeStack,
//     Profile: ProfileStack,
//     Scanner: QRScannerStack,
//     Map: MapStack,
//     About: AboutUsStack,
//   },
//   {
//     initialRouteName: 'Profile',
//     drawerWidth: 250,
//     navigationOptions: {
//       header: null,
//     },
//     contentOptions: {
//       activeTintColor: COLORS.primary,
//     },
//   }
// );

export default AppContainer;
