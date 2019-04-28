import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, KeyboardAvoidingView, Image, Button, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';
import COLORS from '../constants/colors';

const Logo = require('../assets/images/logo.png');

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopWidth: 50,
    borderTopColor: COLORS.white
  },
  outerLogoContainer: {
    marginHorizontal: '10%',
    flex: .8,
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
    flex:1,
    height: null,
    width: null,
    resizeMode: 'contain',
  },
  logoTextContainer: {
    flex: 1, 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    margin: '5%'
  },
  logoText: {
    fontSize: 22, 
    textAlign: 'center'
  },
  subtextContainer: {
    flex: .1, 
    justifyContent: 'center', 
  },
  subtext: {
    alignSelf: 'center',
  },
  form: {
    flex: .8,
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  inputStyle: {
    flex: .8,
//    height: 40,
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
    flex: 1,
    // alignContent: 'space-between',
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
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired, // from withFirebase
  };

  constructor(props) {
    super(props);
  }

  state = {email: '', password: '', errorMessage: null};

  handleLogin = () => {
    const {email, password} = this.state;
    const {navigation, firebase} = this.props;

    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Invalid Parameters:', 'Username / Password cannot be empty');
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
      <KeyboardAvoidingView style={styles.page} keyboardVerticalOffset={-80} behavior="padding" enable>
        <View style={styles.outerLogoContainer}>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
          </View>
          <View style={styles.logoTextContainer}>
            <Text style={{color: COLORS.primary, ...styles.logoText}} > Save a cup </Text>
            <Text style={{color: COLORS.white, fontStyle: 'italic', ...styles.logoText}} > Save the world </Text>
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
          <View style={{marginTop: '2%'}} >
            <Text style={styles.accountPrompt}>Don&#39;t have an account?</Text>
          </View>
          <View style={styles.btnContainer}>
            <Button 
              title="Sign Up" 
              style={styles.btnStyle} 
              color={COLORS.primary} 
              onPress={() => navigation.navigate('Signup')} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default withFirebase(LoginScreen);
