import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'nachos-ui';
import {withHandlers, compose} from 'recompose';
import {connect} from 'react-redux';
import {withFirestore} from 'react-redux-firebase';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  button: {
    marginRight: 20,
  },
});

const SaveCupForm = ({onSaveCupFormSubmit}) => (
  <View style={styles.container}>
    <Button onPress={onSaveCupFormSubmit} style={styles.button}>
      Save a Cup
    </Button>
  </View>
);

SaveCupForm.propTypes = {
  // userToken: PropTypes.string.isRequired,
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
