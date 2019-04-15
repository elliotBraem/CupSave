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
  withFirebase,
  withFirestore,
  connect(({firebase: {auth}}) => ({
    auth,
  })),
  withHandlers({
    onSaveCupFormSubmit: props => () => {
      const currentUID = props.auth.uid;
      const ref = props.firestore.collection('users').doc(`${currentUID}`);
      props.firestore
        .runTransaction(async transaction => {
          const doc = await transaction.get(ref);

          const newTotal = doc.exists ? doc.data().consumption.total + 1 : 1;
          transaction.update(ref, {consumption: {total: newTotal}});
        })
        .catch(error => {
          this.setState({errorMessage: error.message});
        });
    },
  })
);

export default enhance(SaveCupForm);
