import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {createStackNavigator, createDrawerNavigator, createSwitchNavigator} from 'react-navigation';

import HomeContainer from '../screens/Home';
import ProfileContainer from '../screens/Profile';
import StatContainer from '../screens/Stats';
import QRContainer from '../screens/QRScanner';
import MapContainer from '../screens/Map';
import AboutUsContainer from '../screens/AboutUs';
import COLORS from '../constants/colors';
import PasswordContainer from '../screens/Password';
import EmailContainer from '../screens/Email';

/* eslint-disable react/prop-types */
const HomeStack = createStackNavigator({
  Home: {
    path: '/home',
    screen: ({navigation}) => <HomeContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
});

const ProfileStack = createStackNavigator({
  Profile: {
    path: '/profile',
    screen: ({navigation}) => <ProfileContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'Profile',
    },
  },
});

const StatStack = createSwitchNavigator({
  Stats: {
    path: '/stats',
    screen: ({navigation}) => <StatContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'Stats',
    },
  },
});
/* eslint-enable react/prop-types */

const QRScannerStack = createStackNavigator({
  QRScanner: {
    path: '/qrscanner',
    screen: ({navigation}) => <QRContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'QRScanner',
    },
  },
});

const MapStack = createStackNavigator({
  Map: {
    path: '/map',
    screen: ({navigation}) => <MapContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'Map',
    },
  },
});

const AboutUsStack = createStackNavigator({
  AboutUs: {
    path: '/aboutus',
    screen: ({navigation}) => <AboutUsContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'AboutUs',
    },
  },
});
/* eslint-enable react/prop-types */

const PasswordStack = createStackNavigator({
  QRScanner: {
    path: '/password',
    screen: ({navigation}) => <PasswordContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'Password',
    },
  },
});

const EmailStack = createStackNavigator({
  QRScanner: {
    path: '/email',
    screen: ({navigation}) => <EmailContainer navigation={navigation} />,
    navigationOptions: {
      drawerLabel: 'Email',
    },
  },
});

const ProfileSidebar = createDrawerNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
    Stats: StatStack,
    Scanner: QRScannerStack,
    Map: MapStack,
    About: AboutUsStack,
    Password: PasswordStack,
    Email: EmailStack,
  },
  {
    initialRouteName: 'Profile',
    drawerWidth: 250,
    navigationOptions: {
      header: null,
    },
    contentOptions: {
      activeTintColor: COLORS.primary,
    },
  }
);

export default ProfileSidebar;
