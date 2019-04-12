import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, Button, TextInput} from 'react-native';
import {withFirebase} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
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

class SettingsScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired, // from withFirebase
  };

  state = {currentPassword: '', newPassword: '', newEmail: '', errorMessage: null};

  reauthenticate = currentPassword => {
    const {firebase} = this.props;
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  handlePasswordChange = () => {
    const {currentPassword, newPassword} = this.state;
    const {navigation, firebase} = this.props;

    if (currentPassword.trim() === '' || newPassword.trim() === '') {
      Alert.alert('Invalid Parameters:', 'old password / new password cannot be empty');
    } else {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = firebase.auth().currentUser;
          user.updatePassword(newPassword);
        })
        .catch(error => this.setState({errorMessage: error.message}))
        .then(() => navigation.navigate('Home'))
        .catch(error => this.setState({errorMessage: error.message}));
    }
  };

  handleEmailChange = () => {
    const {currentPassword, newEmail} = this.state;
    const {navigation, firebase} = this.props;

    if (currentPassword.trim() === '' || newEmail.trim() === '') {
      Alert.alert('Invalid Parameters:', 'password / new email cannot be empty');
    } else {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = firebase.auth().currentUser;
          user.updateEmail(newEmail);
        })
        .catch(error => this.setState({errorMessage: error.message}))
        .then(() => navigation.navigate('Home'))
        .catch(error => this.setState({errorMessage: error.message}));
    }
  };

  render() {
    const {errorMessage, currentPassword, newEmail, newPassword} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
          <TextInput
            secureTextEntry
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="Current Password"
            value={currentPassword}
            onChangeText={currentPasswordInput => this.setState({currentPassword: currentPasswordInput})}
          />
          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="New Email"
            onChangeText={newEmailInput => this.setState({newEmail: newEmailInput})}
            value={newEmail}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button style={styles.btnStyle} onPress={this.handleEmailChange} title="Change Email" />
        </View>
        <View style={styles.form}>
          <TextInput
            secureTextEntry
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="New Password"
            onChangeText={newPasswordInput => this.setState({newPassword: newPasswordInput})}
            value={newPassword}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button style={styles.btnStyle} onPress={this.handlePasswordChange} title="Change Password" />
        </View>
      </View>
    );
  }
}

export default withFirebase(SettingsScreen);
