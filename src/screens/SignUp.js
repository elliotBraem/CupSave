import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, Alert, Button, KeyboardAvoidingView, Image} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import REGEX from '../constants/regex';
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
    flex: 0.5,
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
  spaceContainer: {
    flex: 0.05,
    justifyContent: 'center',
  },
  subtextContainer: {
    flex: 0.3,
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
});

class SignUpScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    signup: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    loginWithFacebook: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    title: 'SignUp',
  };

  state = {email: '', password: '', confirmedPassword: '', errorMessage: null};

  // TODO: add resetPassword

  handleSignUp = async () => {
    const {email, password, confirmedPassword} = this.state;
    const {navigation, signup, auth} = this.props;

    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('ERROR:', 'Username / password cannot be empty');
    } else if (confirmedPassword !== password) {
      Alert.alert('ERROR:', 'Password does not match confirmed password');
    } else {
      await signup(email, password);

      if (auth.error) {
        this.setState({errorMessage: auth.error});
      } else {
        navigation.navigate('Home');
      }
    }
  };

  handleFacebookSignUp = async () => {
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
    const {errorMessage, email, password, confirmedPassword} = this.state;

    return (
      <KeyboardAvoidingView style={styles.page} keyboardVerticalOffset={-60} behavior="padding" enabled>
        <View style={styles.outerLogoContainer}>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
          </View>
          <View style={styles.logoTextContainer}>
            <Text style={{color: COLORS.primary, ...styles.logoText}}> Welcome to CupSave! </Text>
          </View>
        </View>
        <View style={styles.spaceContainer} />
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
          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            autoCapitalize="none"
            style={styles.inputStyle}
            onChangeText={confirmedPasswordInput => this.setState({confirmedPassword: confirmedPasswordInput})}
            value={confirmedPassword}
          />
          <View style={styles.btnContainer}>
            <Button title="Sign Up" style={styles.btnStyle} color={COLORS.primary} onPress={this.handleSignUp} />
          </View>
          <View style={styles.space} />

          <View style={styles.btnContainer}>
            <Button
              title="Sign up with Facebook"
              style={styles.btnStyle}
              color={COLORS.facebookBlue}
              onPress={this.handleFacebookSignUp}
            />
          </View>
          <View style={styles.subtextContainer}>
            <Text style={styles.subtext}>Already have an account?</Text>
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="Back to login"
              style={styles.btnStyle}
              color={COLORS.primary}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signup: (email, password) => dispatch(authActions.dbSignUp(email, password)),
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
)(SignUpScreen);
