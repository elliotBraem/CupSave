import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, Alert, Button} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';
// import {Button} from 'nachos-ui';

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

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {email: '', password: '', errorMessage: null};

  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired, // from withFirebase
    auth: PropTypes.object, // from withFirebase
  };

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
        .then(() => navigation.navigate('Home'))
        .catch(error => this.setState({errorMessage: error.message}));
      console.log('handleLogin');
    }
  };

  render() {
    const {navigation, firebase} = this.props;
    const {state} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to CupSave!</Text>
        <Text>Let&#39;s get started</Text>
        <Text>Login</Text>
        {state.errorMessage && <Text style={{color: 'red'}}>{state.errorMessage}</Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({email})}
          value={state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({password})}
          value={state.password}
        />
        <View style={styles.buttons}>
          <Button title="Login" onPress={this.handleLogin} style={styles.button} />
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => navigation.navigate('SignUp')}
            style={styles.button}
          />
          <Button title="Open drawer" onPress={() => navigation.openDrawer()} style={styles.button} />
          <Button title="Go back" onPress={() => navigation.navigate('Home')} style={styles.button} />
        </View>
      </View>
    );
  }
}

export default withFirebase(LoginScreen);
