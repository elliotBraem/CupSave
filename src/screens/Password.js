/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase} from 'react-redux-firebase';
import {Button, Input, H1, H4, P} from 'nachos-ui';
//import * as firebase from 'firebase';

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

class PasswordScreen extends Component {
  static navigationOptions = {
    title: 'Password',
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

  state = {currentpassword: '', newpassword: '', errorMessage: null};

  reauthenticate = (currentPassword) => {
    const {navigation, firebase} = this.props;
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }


  handlePasswordChange = () => {
    const {currentpassword, newpassword} = this.state;
    const {navigation, firebase} = this.props;

    if (currentpassword.trim() === '' || newpassword.trim() === '') {
      Alert.alert('Invalid Parameters:', 'old password / new password cannot be empty');
    } else {
        this.reauthenticate(currentpassword)
          .then(() => {var user = firebase.auth().currentUser;
        user.updatePassword(newpassword);
        }).catch(error => this.setState({errorMessage: error.message}))
       .then(() => navigation.navigate('Home'))
       .catch(error => this.setState({errorMessage: error.message}));
    }
  };


  render() {
    const {navigation, firebase} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Change Password</Text>
        <View style={styles.form}>
          {this.state.errorMessage && <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>}
          <Input
            secureTextEntry
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="Current Password"
            value={this.state.currentpassword}
            onChangeText={currentpassword => this.setState({currentpassword})}
          />
          <Input
            secureTextEntry
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="New Password"
            onChangeText={newpassword => this.setState({newpassword})}
            value={this.state.newpassword}
          />
          <View style={styles.btnContainer}>
            <Button style={styles.btnStyle} onPress={this.handlePasswordChange}>
              Change Password
            </Button>
            <Button onPress={() => navigation.openDrawer()} style={styles.button}>
              Menu
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default withFirebase(PasswordScreen);
