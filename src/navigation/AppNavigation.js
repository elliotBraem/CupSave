import React from 'react';
import {StyleSheet} from 'react-native';
import {createSwitchNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/SignUp';
import ProfileScreen from '../screens/Profile';
import QRScannerScreen from '../screens/QRScanner';
import MapScreen from '../screens/Map';
import AboutUsScreen from '../screens/AboutUs';
import COLORS from '../constants/colors';
import LoadingScreen from '../screens/Loading';
import CustomDrawerComponent from '../components/CustomDrawer';
import SettingsScreen from '../screens/Settings';
import HomeIcon from '../assets/images/drawer-icons/home-icon.svg';
import ProfileIcon from '../assets/images/drawer-icons/profile-icon.svg';
import QRScannerIcon from '../assets/images/drawer-icons/qr-scanner-icon.svg';
import MapIcon from '../assets/images/drawer-icons/map-icon.svg';
import AboutIcon from '../assets/images/drawer-icons/about-icon.svg';

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

const hiddenDrawerItems = ['Settings'];

// Stack for logged in user
const AppStack = createDrawerNavigator(
  {
    Settings: {
      screen: SettingsScreen,
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: () => <HomeIcon style={styles.icon} />,
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerLabel: 'Profile',
        drawerIcon: () => <ProfileIcon style={styles.icon} />,
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
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    gesturesEnabled: true,
    drawerBackgroundColor: COLORS.secondary,
    drawerWidth: 250,
    contentComponent: props => {
      const clonedProps = {
        ...props,
        items: props.items.filter(item => !hiddenDrawerItems.includes(item.key)),
      };
      return <CustomDrawerComponent {...clonedProps} />;
    },
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

const AppNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Loading',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
