import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, View, Platform} from 'react-native';
import {withFirebase} from 'react-redux-firebase';
import {Button} from 'nachos-ui';
import ConsumeButton from '../components/ConsumeButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#79db85',
  },
  header: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 15,
    justifyContent: 'center',
  },
});

class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    firebase: PropTypes.shape({
      auth: PropTypes.func.isRequired,
    }).isRequired, // from withFirebase
  };

  state = {currentUser: null};

  componentDidMount() {
    const {firebase} = this.props;
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
  }

  render() {
    const {currentUser} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Home</Text>
        <Text style={styles.header}>
          Hi {currentUser && currentUser.email} {currentUser && currentUser.uid} !
        </Text>
        <View style={styles.buttons}>
          <ConsumeButton currentUser={currentUser} />
        </View>
      </View>
    );
  }
}

export default withFirebase(HomeScreen);
