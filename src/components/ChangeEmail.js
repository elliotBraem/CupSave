import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, TouchableOpacity, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as authActions from '../store/actions/auth';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '90%',
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
    updateProfile: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,
    reAuthenticate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newEmail: '',
      errorMessage: null,
    };
  }

  handleEmailChange = async () => {
    const {currentPassword, newEmail} = this.state;
    const {updateProfile, updateEmail, reAuthenticate} = this.props;

    if (currentPassword.trim() === '' || newEmail.trim() === '') {
      Alert.alert('Invalid Parameters:', 'password / new email cannot be empty');
    } else {
      reAuthenticate(currentPassword)
        .then(() => {
          updateProfile({email: newEmail})
            .then(() => {
              this.setState({errorMessage: 'Email updated!'});
            })
            .catch(error => {
              console.log(error);
            });
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
        <TouchableOpacity style={styles.btnStyle} onPress={this.handleEmailChange}>
          <Text>Change Email</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProfile: formData => dispatch(authActions.dbUpdateProfile(formData)),
    updateEmail: newEmail => dispatch(authActions.dbUpdateEmail(newEmail)),
    reAuthenticate: password => dispatch(authActions.dbReauthenticate(password)),
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
)(ChangeEmail);
