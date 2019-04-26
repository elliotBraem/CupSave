import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, TouchableOpacity, TextInput} from 'react-native';
import {withFirebase} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  btnStyle: {
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class ChangeEmail extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.func.isRequired,
    }).isRequired, // from withFirebase
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newEmail: '',
      errorMessage: null,
    };
  }

  reauthenticate = currentPassword => {
    const {firebase} = this.props;
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  handleEmailChange = () => {
    const {currentPassword, newEmail} = this.state;
    const {firebase} = this.props;

    if (currentPassword.trim() === '' || newEmail.trim() === '') {
      Alert.alert('Invalid Parameters:', 'password / new email cannot be empty');
    } else {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = firebase.auth().currentUser;
          user.updateEmail(newEmail);
        })
        .catch(error => this.setState({errorMessage: error.message}));
    }
  };

  render() {
    const {errorMessage, currentPassword, newEmail} = this.state;
    return (
      <View style={styles.container}>
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
        <TouchableOpacity style={styles.btnStyle} onPress={this.handlePasswordChange}>
          <Text>Change Email</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withFirebase(ChangeEmail);
