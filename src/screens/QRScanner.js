import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, StyleSheet, View, Image, Text} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';
import {connect} from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';
import ScanIcon from '../assets/images/qr-scanner/scan-container.png';
import * as authActions from '../store/actions/auth';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
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

export class QRScannerScreen extends Component {
  static propTypes = {
    incrementConsumption: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
    }).isRequired,
  };

  state = {hasCameraPermission: null};

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  handleBarCodeScanned = ({type, data}) => {
    const {incrementConsumption} = this.props;
    const barcodeObject = JSON.parse(data);
    Alert.alert(
      'Barcode Scanned',
      `Bar code with drink ${barcodeObject.drinkValue} from ${barcodeObject.locationValue} has been scanned!`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {text: 'OK', onPress: () => incrementConsumption(barcodeObject.drinkValue, true)},
      ]
    );
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
        <CustomHeader title="QR Scanner" style={styles.header} />
        <Image source={ScanIcon} style={styles.scanIcon} />
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={styles.qrScanner}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    incrementConsumption: (drinkValue, locationEnabled) =>
      dispatch(authActions.dbIncrementConsumption(drinkValue, locationEnabled)),
    fetchAuthData: () => dispatch(authActions.dbOnAuthorizeStateChange()),
  };
};

const mapStateToProps = (state, ownProps) => {
  const auth = state.auth || {};

  return {
    auth,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QRScannerScreen);
