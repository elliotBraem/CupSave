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

class SignUpScreen extends Component {
  state = {email: '', password: '', confirmedPassword: '', errorMessage: null};

  handleSignUp = () => {
    if (this.state.email.trim() == '' || this.state.password.trim() == '') {
      Alert.alert('ERROR:', 'Username / password cannot be empty');
    } else if (this.state.confirmedPassword != this.state.password) {
      Alert.alert('ERROR:', 'Password does not match confirmed password');
    } else {
      this.props.firebase
        .login({
          email,
          password,
        })
        .then(() => this.navigation.navigate('Home'))
        .catch(error => this.setState({errorMessage: error.message}));
      console.log('handleSignUp');
    }
  };

  static navigationOptions = {
    title: 'SignUp',
  };

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

  render() {
    const {navigation, firebase} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to CupSave!</Text>
        <Text>Sign Up</Text>
        {this.state.errorMessage && <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={confirmedPassword => this.setState({confirmedPassword})}
          value={this.state.confirmedPassword}
        />
        <View style={styles.buttons}>
          <Button title="Sign Up" onPress={this.handleSignUp} style={styles.button} />
          <Button
            title="Already have an account? Login"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          />
          <Button title="Open drawer" onPress={() => navigation.openDrawer()} style={styles.button} />
          <Button title="Go back" onPress={() => navigation.navigate('Home')} style={styles.button} />
        </View>
      </View>
    );
  }
}

export default withFirebase(SignUpScreen);
