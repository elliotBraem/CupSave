import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from '../screens/Home';
import AuthLoadingScreen from '../screens/AuthLoading';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/SignUp';
import ProfileScreen from '../screens/Profile';
import QRScannerScreen from '../screens/QRScanner';
import MapScreen from '../screens/Map';
import AboutUsScreen from '../screens/AboutUs';
import COLORS from '../constants/colors';

const AppStack = createDrawerNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
  QRScanner: {screen: QRScannerScreen},
  Map: {screen: MapScreen},
  AboutUs: {screen: AboutUsScreen},
});

const DrawerNavigation = createStackNavigator(
  {
    DrawerStack: {screen: AppStack},
  },
  {
    headerMode: 'float',
    // navigationOptions: ({navigation}) => ({
    //   headerStyle: {backgroundColor: 'green'},
    //   title: 'Logged In to your app!',
    //   headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>,
    // }),
  }
);

const AuthStack = createStackNavigator(
  {
    loginScreen: {screen: LoginScreen},
    signupScreen: {screen: SignupScreen},
  },
  {
    headerMode: 'float',
    navigationOptions: {
      headerStyle: {backgroundColor: 'red'},
      title: 'You are not logged in',
    },
  }
);

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

export default createAppContainer(DrawerNavigation);
//   createSwitchNavigator(
//     {
//       AuthLoading: {screen: AuthLoadingScreen},
//       App: DrawerNavigation,
//       Auth: AuthStack,
//     },
//     {
//       initialRouteName: 'AuthLoading',
//     }
//   )
// );
// export default PrimaryNav