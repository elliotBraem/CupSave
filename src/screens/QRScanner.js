import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
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
  static navigationOptions = {
    title: 'QRScanner',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader title="QR Scanner" />
      </View>
    );
  }
}

export default QRScannerScreen;
