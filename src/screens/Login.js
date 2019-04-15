import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, KeyboardAvoidingView, Image, Button, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import {compose} from 'recompose';

import * as userActions from '../store/actions/user';

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
    firestore: PropTypes.object.isRequired, // from withFirebase
    // auth: PropTypes.object, // from withFirebase
    getUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  state = {email: '', password: '', errorMessage: null};

  handleLogin = () => {
    const {email, password} = this.state;
    const {navigation, firebase, firestore, getUser} = this.props;

    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Invalid Parameters:', 'Username / password cannot be empty');
    } else {
      firebase
        .login({
          email,
          password,
        })
        .then(authData => {
          firestore
            .collection('users')
            .doc(`${authData.uid}/consumption/cups`)
            .get()
            .then(function getTotal(doc) {
              if (doc.exists) {
                const userData = doc.data();

                getUser(userData);
              }
              return 0;
            });
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
        <text style={styles.header} align="center">
          Welcome to{'\n'}CupSave!
        </text>
        <Image source={Logo} style={styles.logo} />
        <text style={styles.subtext}>Let&#39;s get started</text>
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
            <text style={styles.accountPrompt}>Don&#39;t have an account?</text>
            <Button title="Sign Up" style={styles.btnStyle} onPress={() => navigation.navigate('Signup')} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: user => dispatch(userActions.getUser(user)),
  };
};

const enhance = compose(
  mapDispatchToProps,
  withFirebase,
  withFirestore
);

export default enhance(LoginScreen);
