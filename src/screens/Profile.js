import React, {Component} from 'react';
import {StyleSheet, View, Image, Button} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import {withNavigation} from 'react-navigation';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import StatsOverview from '../components/StatsOverview';
import COLORS from '../constants/colors';
import CustomHeader from '../components/CustomHeader';

const profileImage = require('../assets/images/profileicon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  circle: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 80,
    backgroundColor: 'black',
  },
});

class ProfileScreen extends Component {
  static propTypes = {
    firestore: PropTypes.shape({
      collection: PropTypes.func.isRequired,
    }).isRequired, // from withFirestore
    user: PropTypes.shape({
      user: PropTypes.object.isRequired,
      isLoaded: PropTypes.bool.isRequired,
    }).isRequired,
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired, // from withFirebase
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

  state = {userData: null, errorMessage: ''};

  componentDidMount() {
    const {auth, firestore} = this.props;
    const currentUID = auth.uid;
    const ref = firestore.collection('users').doc(`${currentUID}/consumption/cups`);
    ref
      .get()
      .then(function getTotal(doc) {
        if (doc.exists) {
          const userData = doc.data();
          return userData;
        }
        return 0;
      })
      .then(userData => this.setState({userData}))
      .catch(error => {
        this.setState({errorMessage: error.message});
      });
  }

  render() {
    const {userData} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader title="Profile" />
        <Image source={profileImage} style={styles.circle} />
        <StatsOverview totalCupsSaved={userData && userData.total} />
        <Button onPress={() => navigation.navigate('Settings')} style={styles.button} title="Settings" />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = state.user || {};

  return {
    user,
  };
};

const enhance = compose(
  withNavigation,
  withFirebase,
  withFirestore,
  connect(({firebase: {auth}}, {userData}) => ({
    auth,
    userData,
  })),
  mapStateToProps
);

export default enhance(ProfileScreen);
