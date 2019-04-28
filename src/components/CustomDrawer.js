/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {DrawerItems, SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Logout from '../assets/images/drawer-icons/logout-icon.svg';
import COLORS from '../constants/colors';
import * as authActions from '../store/actions/auth';

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
    fontSize: 14,
    color: COLORS.white,
  },
  profileImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 40,
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
    color: COLORS.white,
    fontSize: 16,
  },
});

class CustomDrawer extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {errorMessage: null};

  handleLogout = async () => {
    const {logout, navigation} = this.props;
    await logout()
      .then(navigation.navigate('Auth'))
      .catch(error => {
        console.log(error);
        this.setState({errorMessage: error});
      });
  };

  render() {
    const {logout, auth, ...props} = this.props;
    return (
      <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.headerContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.headerText}>{auth.user.email}</Text>
        </View>
        <View>
          <DrawerItems {...props} />
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={this.handleLogout} style={styles.innerBottom}>
            <Logout style={{width: 20, height: 20}} />
            <Text style={styles.logout}>Log out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(authActions.dbLogout()),
  };
};

const mapStateToProps = (state, ownProps) => {
  const auth = state.auth || {};
  return {
    auth,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDrawer);
