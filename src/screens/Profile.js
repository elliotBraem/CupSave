import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import {withHandlers, compose, setPropTypes} from 'recompose';
import {connect} from 'react-redux';
import StatsOverview from '../components/StatsOverview';
import AppText from '../components/TextComponents';
import COLORS from '../constants/colors';

const profileImage = require('../assets/images/profileicon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 100,
    // paddingLeft: 15,
    // paddingRight: 15,
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
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired, // from withFirebase
  };

  state = {userData: null, errorMessage: ''};

  componentDidMount() {
    const {auth, firestore} = this.props;
    const currentUID = auth.uid;
    const ref = firestore.collection('users').doc(currentUID + '/consumption/cups');
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
    return (
      <View style={styles.container}>
        <Image source={profileImage} style={styles.circle} />
        {/* <Text>{userData && userData.total}</Text> */}
        <StatsOverview totalCupsSaved={userData && userData.total} />
      </View>
    );
  }
}

const enhance = compose(
  withFirebase,
  withFirestore,
  connect(({firebase: {auth}}, {userData}) => ({
    auth,
    userData,
  }))
);

export default enhance(ProfileScreen);
