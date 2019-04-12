import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator, createSwitchNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/SignUp';
import ProfileScreen from '../screens/Profile';
import QRScannerScreen from '../screens/QRScanner';
import MapScreen from '../screens/Map';
import AboutUsScreen from '../screens/AboutUs';
import COLORS from '../constants/colors';
import LoadingScreen from '../screens/Loading';
import CustomDrawerComponent from '../components/customDrawer';
import HomeIcon from '../assets/images/drawer-icons/home-icon.svg';
import ProfileIcon from '../assets/images/drawer-icons/profile-icon.svg';
import QRScannerIcon from '../assets/images/drawer-icons/qr-scanner-icon.svg';
import MapIcon from '../assets/images/drawer-icons/map-icon.svg';
import AboutIcon from '../assets/images/drawer-icons/about-icon.svg';
import BurgerIcon from '../assets/images/drawer-icons/burger-icon.svg';

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  burgerIcon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    color: 'red',
  },
});

// Stack for logged in user
const AppStack = createDrawerNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerLabel: 'Profile',
        drawerIcon: () => <ProfileIcon style={styles.icon} />,
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: () => <HomeIcon style={styles.icon} />,
      },
    },
    QRScanner: {
      screen: QRScannerScreen,
      navigationOptions: {
        drawerLabel: 'QR Scanner',
        drawerIcon: () => <QRScannerIcon style={styles.icon} />,
      },
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        drawerLabel: 'Map',
        drawerIcon: () => <MapIcon style={styles.icon} />,
      },
    },
    AboutUs: {
      screen: AboutUsScreen,
      navigationOptions: {
        drawerLabel: 'About Us',
        drawerIcon: () => <AboutIcon style={styles.icon} />,
      },
    },
  },
  {
    headerMode: 'float',
    headerTransparent: true,
    gesturesEnabled: true,
    // Header for logged in user
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: <BurgerIcon style={styles.burgerIcon} onPress={() => navigation.toggleDrawer()} />,
    }),
    drawerBackgroundColor: COLORS.secondary,
    drawerWidth: 250,
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeBackgroundColor: COLORS.primary,
      labelStyle: {
        color: COLORS.white,
        marginLeft: 0,
        fontSize: 16,
        fontWeight: 'normal',
      },
    },
  }
);

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
    DrawerStack: AppStack,
  },
  {
    headerMode: 'float',
    gesturesEnabled: true,
    // Header for logged in user
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: COLORS.primary,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: <BurgerIcon style={styles.burgerIcon} onPress={() => navigation.toggleDrawer()} />,
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
