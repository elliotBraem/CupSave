import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, Alert, Button, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as authActions from '../store/actions/auth';

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
          <Button title="Submit" onPress={this.handleSignUp} style={styles.button} />
          <Button title="Sign up with Facebook" onPress={this.handleFacebookSignUp} style={styles.button} />
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
