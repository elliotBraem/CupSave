import React, {Component} from 'react';
import {Text, StyleSheet, View, Button, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 42,
    alignSelf: 'center',
    marginBottom: 50,
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
  state = {email: '', password: '', errorMessage: null, btnColor: '#56638A'};
  handleLogin = () => {
    const {email, password} = this.state;

    if (email.trim() == "" || password.trim() == "") {
      Alert.alert("Invalid Parameters:", "Username / password cannot be empty");
    } else {
      this.props.firebase.login({email: email, password: password}).then(() => this.navigation.navigate('Main')).catch(error => this.setState({errorMessage: error.message}))
      console.log('handleLogin')
    }
  }
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

  render() {
    const {navigation, firebase} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}> Welcome to CupSave!</Text>
        <Text>Let's get started</Text>
          <Text>Login</Text>
          {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <View style={styles.view}>
            <Button title="Login" onPress={this.handleLogin} color={this.state.btnColor}/>
          </View>
          <View style={styles.view}>
            <Button
              title="Don't have an account? Sign Up"
              onPress={() => navigation.navigate('SignUp')} color={this.state.btnColor}/>
          <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
          <Button title="Go back" onPress={() => navigation.navigate('Home')} />
        </View>
      </View>
    );
  }
}

export default withFirebase(LoginScreen);
