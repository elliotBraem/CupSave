import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ImagePicker, Permissions} from 'expo';
import * as authActions from '../store/actions/auth';
import COLORS from '../constants/colors';
import {FBStorage} from '../data';

const profileImage = '../assets/images/profileicon.png';

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
    marginTop: 10,
    marginBottom: 20,
  },
  btnStyle: {
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  circle: {
    width: 160,
    height: 160,
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 80,
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 100,
  },
  image: {
    width: 160,
    height: 160,
  },
});

class ChangeProfilePicture extends Component {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
    }).isRequired,
  };

  state = {
    avatar: profileImage,
    errorMessage: null,
  };

  componentDidMount() {
    const {auth} = this.props;

    FBStorage.ref()
      .child(`profilePictures/${auth.uid}`)
      .getDownloadURL()
      .then(image => this.setState({avatar: image}))
      .catch(error => console.log(error.message));
  }

  handleChooseProfilePictureChange = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: 'photo',
        allowsEditing: true,
      });
      if (!result.cancelled) {
        console.log(result);
        this.setState({
          avatar: result,
        });
      }
    } else {
      throw new Error('Location permission not granted');
    }
  };

  handleChooseProfilePictureSubmit = () => {
    const {updateProfile, auth} = this.props;
    const {avatar} = this.state;

    updateProfile({email: auth.user.email, avatar});
  };

  render() {
    const {errorMessage, avatar} = this.state;

    return (
      <View style={styles.container}>
        {errorMessage !== null && <Text style={{color: 'red'}}>{errorMessage}</Text>}

        <View style={styles.circle}>
          {avatar !== null ? (
            <Image source={{uri: avatar}} style={styles.image} />
          ) : (
            <Image source={profileImage} style={styles.image} />
          )}
        </View>

        <TouchableOpacity style={styles.btnStyle} onPress={this.handleChooseProfilePictureChange}>
          <Text>Choose Profile Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnStyle} onPress={this.handleChooseProfilePictureSubmit}>
          <Text>Submit Profile Picture</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProfile: formData => dispatch(authActions.dbUpdateProfile(formData)),
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
)(ChangeProfilePicture);
