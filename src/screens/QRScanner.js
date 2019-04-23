import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Image, Text} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';
import ScanIcon from '../assets/images/qr-scanner/scan-container.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  scanIcon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '40%',
    zIndex: 100,
  },
  qrScanner: {
    flex: 1,
  },
});

class QRScannerScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {hasCameraPermission: null};

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  handleBarCodeScanned = ({type, data}) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const {hasCameraPermission} = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <CustomHeader title="QR Scanner" />
        <Image source={ScanIcon} style={styles.scanIcon} />
        <BarCodeScanner onBarCodeScanned={this.handleBarCodeScanned} style={styles.qrScanner} />
      </View>
    );
  }
}

export default QRScannerScreen;
