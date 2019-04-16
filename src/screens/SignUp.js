import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, Alert, Button, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';
import REGEX from '../constants/regex';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 38,
    marginBottom: 20,
  },
  button: {
    marginBottom: 15,
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 14,
    alignSelf: 'stretch',
    textAlign: 'center',
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
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.header}>Welcome to CupSave!</Text>
        <Text>Sign Up</Text>
        {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          value={email}
          onChangeText={emailInput => this.setState({email: emailInput})}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          value={password}
          onChangeText={passwordInput => this.setState({password: passwordInput})}
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={confirmedPasswordInput => this.setState({confirmedPassword: confirmedPasswordInput})}
          value={confirmedPassword}
        />
        <View style={styles.buttons}>
          <Button title="Sign Up" onPress={this.handleSignUp} style={styles.button} />
          <Button
            title="Already have an account? Login"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default withFirebase(SignUpScreen);
