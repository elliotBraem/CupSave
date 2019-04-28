import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, Button, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import COLORS from '../constants/colors';
import * as authActions from '../store/actions/auth';
import Loading from '../components/Loading';

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
    updateProfile: PropTypes.func.isRequired,
    reAuthenticate: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  state = {
    currentPassword: '',
    newPassword: '',
    newEmail: '',
    errorMessage: null,
  };

  handlePasswordSubmit = async () => {
    const {currentPassword, newPassword} = this.state;
    const {navigation, reAuthenticate, updateProfile, auth} = this.props;

    if (currentPassword.trim() === '' || newPassword.trim() === '') {
      Alert.alert('Invalid Parameters:', 'old password / new password cannot be empty');
    } else {
      await reAuthenticate(currentPassword);

      await updateProfile({email: auth.email, password: newPassword, changePassword: true});

      if (auth.error) {
        this.setState({errorMessage: auth.error});
      } else {
        navigation.navigate('Home');
      }
    }
  };

  handleEmailSubmit = async () => {
    const {currentPassword, newEmail} = this.state;
    const {navigation, reAuthenticate, updateProfile, auth} = this.props;

    if (currentPassword.trim() === '' || newEmail.trim() === '') {
      Alert.alert('Invalid Parameters:', 'password / new email cannot be empty');
    } else {
      await reAuthenticate(currentPassword);

      await updateProfile({email: newEmail, changeEmail: true});

      if (auth.error) {
        this.setState({errorMessage: auth.error});
      } else {
        navigation.navigate('Home');
      }
    }
  };

  render() {
    const {auth} = this.props;
    const {errorMessage, currentPassword, newEmail, newPassword} = this.state;

    if (!auth.isLoaded) {
      return <Loading />;
    }

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
          <Button style={styles.btnStyle} onPress={this.handleEmailSubmit} title="Change Email" />
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
          <Button style={styles.btnStyle} onPress={this.handlePasswordSubmit} title="Change Password" />
        </View>
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
)(SettingsScreen);
