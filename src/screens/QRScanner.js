import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Button} from 'nachos-ui';
import {Permissions} from 'expo';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
});

class QRScannerScreen extends Component {
  // static navigationOptions = {
  //   title: 'QRScanner',
  // };

  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {hasCameraPermission: null};

  componentDidMount() {
    this.scan();
  }

  async scan() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader title="QR Scanner" />
        <View style={styles.buttons}>
          <Button onPress={this.scan.bind(this)} style={styles.button}>
            Scan
          </Button>
        </View>
      </View>
    );
  }
}

export default QRScannerScreen;
