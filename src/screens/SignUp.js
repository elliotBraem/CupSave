import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, Alert, Button, KeyboardAvoidingView, Image} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';
import REGEX from '../constants/regex';
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
    flex: .5,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 40,
  },
  logoContainer: {
    flex: .7,
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
  spaceContainer: {
    flex: .05,
    justifyContent: 'center',
  },
  subtextContainer: {
    flex: .6,
    justifyContent: 'center',
  },
  subtext: {
    alignSelf: 'center',
  },
  form: {
    flex: .6,
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
    flex: 1.2,
    // alignContent: 'space-between',
  },
});


class SignUpScreen extends Component {
  static navigationOptions = {
    title: 'SignUp',
  };

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

  state = {email: '', password: '', confirmedPassword: '', errorMessage: null};

  handleSignUp = () => {
    const {email, password, confirmedPassword} = this.state;
    const {navigation, firebase} = this.props;
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('ERROR:', 'Username / password cannot be empty');
    } else if (confirmedPassword !== password) {
      Alert.alert('ERROR:', 'Password does not match confirmed password');
    } else {
      const currentTimeInUnixEpoch = new Date().valueOf();

      const isUniversity = new RegExp(REGEX.UNIVERSITY_EMAIL).test(email);

      const badges = {
        '6W2UJvCl9AKy3X97jhZ0': true, // Hello World badge
      };

      if (isUniversity) {
        badges.rJ7XjWH9a336tPj9caEB = true;
      }

      firebase
        .createUser(
          {
            email,
            password,
          },
          {
            email,
            badges,
            consumption: {
              total: 0,
              most_recent_consumption: currentTimeInUnixEpoch,
              history: {
                [currentTimeInUnixEpoch]: 0,
              },
            },
            city: '',
            level: 0,
            friends: {
              byZi8ywta1hgA9oTc6YwHEDrrHU2: true, // Test user
            },
            cup_volume_oz: 16,
          }
        )
        .then(() => navigation.navigate('Home'))
        .catch(error => this.setState({errorMessage: error.message}));
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
            <Text style={{color: COLORS.primary, ...styles.logoText}} > Welcome to CupSave! </Text>
          </View>
        </View>
        <View style={styles.spaceContainer}>
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
          <TextInput
            secureTextEntry
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="Confirm Password"
            value={confirmedPassword}
            onChangeText={confirmedPasswordInput => this.setState({confirmedPassword: confirmedPasswordInput})}
          />
          <View style={styles.btnContainer}>
            <Button 
              title="Sign Up" 
              style={styles.btnStyle} 
              color={COLORS.primary} 
              onPress={this.handleSignUp} 
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

export default withFirebase(SignUpScreen);
