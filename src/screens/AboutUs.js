import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Platform} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  inner: {
    marginTop: Platform.OS === 'ios' ? 100 : 100 - 24,
  },
});

class AboutUsScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader title="About Us" />
        <View style={styles.header} />
      </View>
    );
  }
}

export default AboutUsScreen;
