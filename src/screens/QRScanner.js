import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, View, AsyncStorage, Alert} from 'react-native';
import {Button} from 'nachos-ui';
import {BarCodeScanner, Permissions} from 'expo';

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 15,
    paddingRight: 15,
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

class QRScannerScreen extends Component {
  state = {hasCameraPermission: null};

  static navigationOptions = {
    title: 'QRScanner',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>QR Scanner</Text>
         <View style={styles.buttons}>
          <Button style={styles.button}>
            Scan
          </Button>
          <Button onPress={() => navigation.openDrawer()} style={styles.button}>
            Menu
          </Button>
        </View>
      </View>
    );
  }

   async scan() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
     });
   }

   componentDidMount() {
    this.scan()
   }


}

export default QRScannerScreen;
