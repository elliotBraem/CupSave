import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {withHandlers, compose} from 'recompose';
import {connect} from 'react-redux';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import COLORS from '../constants/colors';
import {AppText} from './TextComponents';
import Logo from '../assets/images/logo.png';

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 130,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    width: 270,
    height: 70,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    height: 45,
    width: 30,
    marginRight: 30,
  },
});

const SaveCupForm = ({onSaveCupFormSubmit}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onSaveCupFormSubmit} style={styles.button}>
      <Image source={Logo} style={styles.logoIcon} />
      <AppText>SAVE A CUP</AppText>
    </TouchableOpacity>
  </View>
);

SaveCupForm.propTypes = {
  onSaveCupFormSubmit: PropTypes.func.isRequired,
};

const enhance = compose(
  withFirestore,
  connect(({firebase: {auth}}) => ({
    auth,
  })),
  withHandlers({
    onSaveCupFormSubmit: ({auth, firestore}) => () => {
      const currentUID = auth.uid;
      const userRef = firestore.collection('users').doc(`${currentUID}`);
      const currentTimeInUnixEpoch = new Date().valueOf();
      firestore
        .runTransaction(async transaction => {
          const doc = await transaction.get(userRef);

          const newTotal = doc.exists ? doc.data().consumption.total + 1 : 1;

          const data = {
            consumption: {
              total: newTotal,
              most_recent_consumption: currentTimeInUnixEpoch,
              history: {
                [currentTimeInUnixEpoch]: newTotal,
              },
            },
          };

          transaction.set(userRef, data, {merge: true});

          return newTotal;
        })
        .catch(error => {
          // this.setState({errorMessage: error.message});
          console.log(error.message);
        });
    },
  })
);

export default enhance(SaveCupForm);
