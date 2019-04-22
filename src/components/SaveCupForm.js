import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, TextInput, Switch} from 'react-native';
import PropTypes from 'prop-types';
import {withHandlers, compose} from 'recompose';
import {connect} from 'react-redux';
import {withFirestore} from 'react-redux-firebase';
import COLORS from '../constants/colors';
import {AppText, LabelText} from './TextComponents';
import Logo from '../assets/images/logo.png';

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 130,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    // marginBottom: 20,
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
  inputStyle: {
    height: 26,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    // alignSelf: 'stretch',
    // textAlign: 'center',
  },
  logoIcon: {
    height: 45,
    width: 30,
    marginRight: 30,
  },
});

class SaveCupForm extends Component {
  static propTypes = {
    onSaveCupFormSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleLocationEnable = this.toggleLocationEnable.bind(this);
    this.state = {
      locationEnabled: true,
      drinkValue: '',
    };
  }

  // state = {drinkValue: '', locationEnabled: true};

  toggleLocationEnable() {
    this.setState(prevState => ({
      locationEnabled: !prevState.locationEnabled,
    }));
  }

  render() {
    const {onSaveCupFormSubmit} = this.props;
    const {drinkValue, locationEnabled} = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onSaveCupFormSubmit} style={styles.button}>
          <Image source={Logo} style={styles.logoIcon} />
          <AppText>SAVE A CUP</AppText>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <View>
            <LabelText>I&#39;m drinking</LabelText>
            <TextInput
              style={styles.inputStyle}
              maxLength={40}
              autoCapitalize="none"
              placeholder="What are you drinking?"
              value={drinkValue}
              onChangeText={drinkValueInput => this.setState({drinkValue: drinkValueInput})}
            />
          </View>
          <View>
            <LabelText>Share location</LabelText>
            <Switch value={locationEnabled} onValueChange={this.toggleLocationEnable} />
          </View>
        </View>
      </View>
    );
  }
}

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
