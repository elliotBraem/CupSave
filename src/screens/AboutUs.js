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

class AboutUsScreen extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'AboutUs',
  };

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
      </View>
    );
  }
}

export default AboutUsScreen;
