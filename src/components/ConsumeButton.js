import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'nachos-ui';
import {withHandlers, compose, setPropTypes} from 'recompose';
import {connect} from 'react-redux';
import {withFirestore, withFirebase} from 'react-redux-firebase';
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

class SaveCupForm extends Component {
  static propTypes = {
    // currentUser: PropTypes.func({
    //   doc: PropTypes.func.isRequired,
    // }).isRequired,
    firestore: PropTypes.shape({
      runTransaction: PropTypes.func.isRequired,
    }).isRequired,
    firebase: PropTypes.shape({
      auth: PropTypes.func.isRequired,
    }).isRequired, // from withFirebase
  };

  state = {consumeCount: null, errorMessage: null};

  onSaveCupFormSubmit = () => {
    const {firestore, firebase} = this.props;
    const currentUID = firebase.auth().currentUser.uid;
    const ref = firestore.collection('users').doc(currentUID + '/consumption/title');

    firestore
      .runTransaction(async transaction => {
        const doc = await transaction.get(ref);

        if (!doc.exists) {
          transaction.set(ref, {total: 1});
          return 1;
        }

        const newTotal = doc.data().total + 1;
        transaction.update(ref, {total: newTotal});
        this.setState({consumeCount: newTotal});
        return newTotal;
      })
      // .then(this.setState({errorMessage: 'none'}))
      .catch(error => {
        this.setState({errorMessage: error.message});
      });
  };

  render() {
    const {consumeCount, errorMessage} = this.state;
    return (
      <View style={styles.container}>
        <Button onPress={() => this.onSaveCupFormSubmit()} style={styles.button}>
          Save a Cup
        </Button>
        <Text>Hey, look</Text>
        {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
        <Text>{consumeCount}</Text>
      </View>
    );
  }
}

const enhance = compose(
  withFirestore,
  withFirebase,
  setPropTypes({
    firestore: PropTypes.shape({
      runTransaction: PropTypes.func.isRequired,
    }),
    firebase: PropTypes.shape({
      auth: PropTypes.func.isRequired,
    }).isRequired, // from withFirebase
  })
);

export default enhance(SaveCupForm);
