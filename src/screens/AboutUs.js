import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Platform} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';
import {AppText} from '../components/TextComponents';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  inner: {
    paddingTop: Platform.OS === 'ios' ? 100 : 100 - 24,
    paddingLeft: 10,
    paddingRight: 10,
  },
  paragraphText: {
    marginTop: 20,
    fontSize: 18,
    color: COLORS.white,
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
        <View style={styles.header}>
          <View style={styles.inner}>
            <AppText style={styles.paragraphText}>
              Every year the United States alone throws away 50 billion disposable coffee cups. The majority of these
              coffee cups end up in landfills, in incinerators, and in our oceans. A simple yet effective response to
              this problem is to use reusable cups, a solution that many people already implement in their day to day
              lives. To reward people for using reusable cups, we plan to develop an application that tracks a user’s
              ecological footprint of disposable coffee cups saved by purchasing drinks with a personal mug. The
              application will list participating cafes in a map format, let users log in with different devices, and
              scan café-specific QR codes when purchasing their drinks.
            </AppText>
            <AppText style={styles.paragraphText}>
              Developed by: Elliot Braem, Zach Kremer, Jake Braun, Bennet Bremer, Harris Thompson, Matthew Strimaitis
            </AppText>
          </View>
        </View>
      </View>
    );
  }
}

export default AboutUsScreen;
