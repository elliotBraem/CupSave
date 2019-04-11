/* eslint-disable react/prop-types */
import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {DrawerItems, SafeAreaView} from 'react-navigation';
import {withFirebase} from 'react-redux-firebase';
import Logout from '../assets/images/drawer-icons/logout-icon.svg';

const profileImage = require('../assets/images/profileicon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginLeft: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    color: '#ffffff',
  },
  profileImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 40,
    backgroundColor: 'black',
  },
  bottom: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 36,
    marginLeft: 20,
  },
  innerBottom: {
    flexDirection: 'row',
  },
  logout: {
    marginLeft: 10,
    color: '#ffffff',
    fontSize: 16,
  },
});

const customDrawer = props => {
  return (
    <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
      <View style={styles.headerContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.headerText}>First M. Last</Text>
      </View>
      <View>
        <DrawerItems {...props} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.innerBottom}>
          <Logout style={{width: 20, height: 20}} />
          <Text style={styles.logout} onPress={() => props.firebase.logout()}>
            Log out
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default withFirebase(customDrawer);
