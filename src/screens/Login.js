import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, StyleSheet, View, Alert, KeyboardAvoidingView, Image, Button, TextInput} from 'react-native';
import PropTypes from 'prop-types';

import * as authActions from '../store/actions/auth';

const Logo = require('../assets/images/logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 38,
  },
  subtext: {
    alignSelf: 'center',
  },
  logo: {
    flex: 1,
    alignSelf: 'center',
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  inputStyle: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  btnStyle: {
    width: '100%',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'column',
    // alignContent: 'space-between',
  },
  accountPrompt: {
    margin: 15,
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
      <KeyboardAvoidingView style={styles.container} behavior="padding" enable>
        <Text style={styles.header} align="center">
          Welcome to{'\n'}CupSave!
        </Text>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.subtext}>Let&#39;s get started</Text>
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
            <Button title="Login" style={styles.btnStyle} onPress={this.handleLogin} />
            <Button title="Login with Facebook" style={styles.btnStyle} onPress={this.handleFacebookLogin} />
            <Text style={styles.accountPrompt}>Don&#39;t have an account?</Text>
            <Button title="Sign Up" style={styles.btnStyle} onPress={() => navigation.navigate('Signup')} />
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
