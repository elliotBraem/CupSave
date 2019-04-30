import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, StyleSheet, View, Alert, KeyboardAvoidingView, Image, Button, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';

import * as authActions from '../store/actions/auth';

const Logo = require('../assets/images/logo.png');


const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopWidth: 50,
    borderTopColor: COLORS.white,
  },
  outerLogoContainer: {
    marginHorizontal: '10%',
    flex: 0.6,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 40,
  },
  logoContainer: {
    flex: 1.5,
    marginLeft: '5%',
  },
  logo: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
  },
  logoTextContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '5%',
  },
  logoText: {
    fontSize: 22,
    textAlign: 'center',
  },
  subtextContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  subtext: {
    alignSelf: 'center',
  },
  form: {
    flex: 0.8,
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  inputStyle: {
//    flex: 0.8,
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: '2%',
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: COLORS.white,
  },
  btnStyle: {
    width: '100%',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  btnContainer: {
    flex: 0.5,
    height: 40,
    // alignContent: 'space-between',
  },
  space: {
    height: 40,
  },
  accountPrompt: {
    margin: 15,
    alignSelf: 'center',
  },
});

class LoginScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    login: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    loginWithFacebook: PropTypes.func.isRequired,
  };

  state = {email: '', password: '', errorMessage: null};

  // TODO: add resetPassword

  handleLogin = async () => {
    const {email, password} = this.state;
    const {navigation, login, auth} = this.props;

    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Invalid Parameters:', 'Username / Password cannot be empty');
    } else {
      await login(email, password);

      if (auth.error) {
        this.setState({errorMessage: auth.error});
      } else {
        navigation.navigate('App');
      }
    }
  };

  handleFacebookLogin = async () => {
    const {navigation, loginWithFacebook, auth} = this.props;
    await loginWithFacebook();

    if (auth.error) {
      this.setState({errorMessage: auth.error});
    } else {
      navigation.navigate('App');
    }
  };

  render() {
    const {navigation} = this.props;
    const {errorMessage, email, password} = this.state;

    return (
      <KeyboardAvoidingView style={styles.page}  keyboardVerticalOffset={-100} behavior="padding" enable>
        <View style={styles.outerLogoContainer}>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
          </View>
          <View style={styles.logoTextContainer}>
            <Text style={{color: COLORS.primary, ...styles.logoText}}> Save a cup </Text>
            <Text style={{color: COLORS.white, fontStyle: 'italic', ...styles.logoText}}> Save the world </Text>
          </View>
        </View>
        <View style={styles.subtextContainer}>
          <Text style={styles.subtext}>Let&#39;s get started</Text>
        </View>
        <View style={styles.form}>
          {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            onChangeText={emailInput => this.setState({email: emailInput})}
          />
          <TextInput
            secureTextEntry
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="Password"
            value={password}
            onChangeText={passwordInput => this.setState({password: passwordInput})}
          />
          <View style={styles.btnContainer}>
            <Button 
              title="Login" 
              style={styles.btnStyle} 
              color={COLORS.primary} 
              onPress={this.handleLogin} 
            />
          </View>
          <View style={styles.space} />
          <View style={styles.btnContainer}>
            <Button title="Login with Facebook" color={COLORS.facebookBlue} style={styles.btnStyle} onPress={this.handleFacebookLogin} />
          </View>
          <View style={{marginTop: '2%'}}>
            <Text style={styles.accountPrompt}>Don&#39;t have an account?</Text>
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="Sign Up"
              style={styles.btnStyle}
              color={COLORS.primary}
              onPress={() => navigation.navigate('Signup')}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (email, password) => dispatch(authActions.dbLogin(email, password)),
    resetPassword: (email, password) => dispatch(authActions.dbResetPassword(email, password)),
    loginWithFacebook: () => dispatch(authActions.dbFacebookLogin()),
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
)(LoginScreen);
