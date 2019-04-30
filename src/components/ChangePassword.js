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
    marginBottom: 20,
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

class ChangePassword extends Component {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
    reAuthenticate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      errorMessage: null,
    };
  }

  handlePasswordChange = () => {
    const {currentPassword, newPassword} = this.state;
    const {reAuthenticate, updateProfile} = this.props;

    if (currentPassword.trim() === '' || newPassword.trim() === '') {
      Alert.alert('Invalid Parameters:', 'old password / new password cannot be empty');
    } else {
      reAuthenticate(currentPassword)
        .then(() => {
          updateProfile({password: newPassword})
            .then(() => {
              this.setState({errorMessage: 'Password updated!'});
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => this.setState({errorMessage: error.message}));
    }
  };

  render() {
    const {errorMessage, currentPassword, newPassword} = this.state;
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
          secureTextEntry
          style={styles.inputStyle}
          autoCapitalize="none"
          placeholder="New Password"
          onChangeText={newPasswordInput => this.setState({newPassword: newPasswordInput})}
          value={newPassword}
        />
        <TouchableOpacity style={styles.btnStyle} onPress={this.handlePasswordChange}>
          <Text>Change Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProfile: formData => dispatch(authActions.dbUpdateProfile(formData)),
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
)(ChangePassword);
