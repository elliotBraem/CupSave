import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, KeyboardAvoidingView, Image} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';
import {Button, Input, H1, H4, P} from 'nachos-ui';

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
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired, // from withFirebase
    // auth: PropTypes.object, // from withFirebase
  };

  state = {email: '', password: '', errorMessage: null};

  handleLogin = () => {
    const {email, password} = this.state;
    const {navigation, firebase} = this.props;

    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Invalid Parameters:', 'Username / password cannot be empty');
    } else {
      firebase
        .login({
          email,
          password,
        })
        .then(() => navigation.navigate('App'))
        .catch(error => this.setState({errorMessage: error.message}));
    }
  };

  render() {
    const {navigation} = this.props;
    const {errorMessage, email, password} = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="position" enable>
        <H1 style={styles.header} align="center">
          Welcome to{'\n'}CupSave!
        </H1>
        <Image source={Logo} style={styles.logo} />
        <H4 style={styles.subtext}>Let&#39;s get started</H4>
        <View style={styles.form}>
          {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
          <Input
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            onChangeText={emailInput => this.setState({email: emailInput})}
          />
          <Input
            secureTextEntry
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="Password"
            value={password}
            onChangeText={passwordInput => this.setState({password: passwordInput})}
          />
          <View style={styles.btnContainer}>
            <Button style={styles.btnStyle} onPress={this.handleLogin}>
              Login
            </Button>
            <P style={styles.accountPrompt}>Don&#39;t have an account?</P>
            <Button style={styles.btnStyle} onPress={() => navigation.navigate('Signup')}>
              Sign Up
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default withFirebase(LoginScreen);
