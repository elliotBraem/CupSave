import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';
import {Button, Input, H1, H4, P} from 'nachos-ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // buttons: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom: 10,
  // },
  header: {
    fontSize: 38,
    // marginBottom: 20,
  },
  // textInput: {
  //   height: 40,
  //   width: '100%',
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   marginTop: 14,
  //   alignSelf: 'stretch',
  //   textAlign: 'center',
  // },
  inputStyle: {
    margin: 15,
  },
  btnStyle: {
    margin: 15,
  },
});

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
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
        .then(() => navigation.navigate('Home'))
        .catch(error => this.setState({errorMessage: error.message}));
      console.log('handleLogin');
    }
  };

  render() {
    const {navigation, firebase} = this.props;

    return (
      <View style={styles.container}>
        <H1 style={styles.header} align="center">
          Welcome to{'\n'}CupSave!
        </H1>
        <H4>Let&#39;s get started</H4>
        <H4>Login</H4>
        {this.state.errorMessage && <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>}
        <Input
          style={styles.inputStyle}
          autoCapitalize="none"
          placeholder="Email"
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <Input
          secureTextEntry
          style={styles.inputStyle}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        <Button style={styles.btnStyle} onPress={this.handleLogin}>
          Login
        </Button>
        <P>Don&#39;t have an account?</P>
        <Button onPress={() => navigation.navigate('SignUp')} style={styles.button}>
          Sign Up
        </Button>
        <Button onPress={() => navigation.openDrawer()} style={styles.button}>
          Open drawer
        </Button>
        {/* <Button title="Open drawer" onPress={() => navigation.openDrawer()} style={styles.button} />
        <Button title="Go back" onPress={() => navigation.navigate('Home')} style={styles.button} /> */}
      </View>
    );
  }
}

export default withFirebase(LoginScreen);
