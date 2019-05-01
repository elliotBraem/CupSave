/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {DrawerItems, SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Logout from '../assets/images/drawer-icons/logout-icon.svg';
import COLORS from '../constants/colors';
import * as authActions from '../store/actions/auth';
import {FBStorage} from '../data';

const profileImage = '../assets/images/profileicon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'open-sans-regular',
  },
  headerContainer: {
    paddingLeft: 20,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 14,
    color: COLORS.white,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
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

export class CustomDrawer extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    avatar: profileImage,
    custom: false,
    errorMessage: null,
  };

  componentDidMount() {
    const {auth} = this.props;

    FBStorage.ref()
      .child(`profilePictures/${auth.uid}`)
      .getDownloadURL()
      .then(image =>
        this.setState({
          avatar: image,
          custom: true,
        })
      )
      .catch(error => console.log(error.message));
  }

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
    const {custom, avatar} = this.state;

    return (
      <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.headerContainer}>
          {custom === false ? (
            <Image source={avatar} style={styles.profileImage} />
          ) : (
            <Image source={{uri: avatar}} style={styles.profileImage} />
          )}
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
