import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {withHandlers, compose} from 'recompose';
import {connect} from 'react-redux';
import {withFirestore} from 'react-redux-firebase';
import COLORS from '../constants/colors';
import {AppText} from './TextComponents';

const Logo = require('../assets/images/logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 300,
    height: 130,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  button: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: 270,
    height: 70,
    backgroundColor: COLORS.primary,
  },
  logoIcon: {
    height: 45,
    width: 30,
    marginRight: 30,
  },
});

const SaveCupForm = ({onSaveCupFormSubmit}) => (
  <View style={styles.container}>
    <View style={styles.inner}>
      <TouchableOpacity onPress={onSaveCupFormSubmit} style={styles.button}>
        <Image source={Logo} style={styles.logoIcon} />
        <AppText>SAVE A CUP</AppText>
      </TouchableOpacity>
    </View>
  </View>
);

SaveCupForm.propTypes = {
  onSaveCupFormSubmit: PropTypes.func.isRequired,
};

const enhance = compose(
  connect(({firebase: {auth}}) => ({
    auth,
  })),
  withFirestore,
  withHandlers({
    onSaveCupFormSubmit: props => () => {
      const currentUID = props.auth.uid;
      const ref = props.firestore.collection('users').doc(currentUID + '/consumption/cups');
      props.firestore
        .runTransaction(async transaction => {
          const doc = await transaction.get(ref);

          if (!doc.exists) {
            transaction.set(ref, {total: 1});
          }

          const newTotal = doc.data().total + 1;
          transaction.update(ref, {total: newTotal});
        })
        // .then(newTotal => {
        //   console.log(newTotal);
        // })
        .catch(error => {
          this.setState({errorMessage: error.message});
        });
    },
  })
);

export default enhance(SaveCupForm);
