import React, {PureComponent} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import BurgerIcon from '../assets/images/drawer-icons/burger-icon.svg';
import {HeaderTitle} from './TextComponents';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%',
    height: Platform.OS === 'ios' ? 70 : 70 - 24,
    marginTop: Platform.OS === 'ios' ? 30 : 70 - 24,
    alignContent: 'center',
    flexDirection: 'row',
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  burgerIcon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 20,
  },
});

export class CustomHeader extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      toggleDrawer: PropTypes.func.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const {navigation, title} = this.props;
    return (
      <View style={styles.container}>
        <BurgerIcon style={styles.burgerIcon} onPress={() => navigation.toggleDrawer()} />
        <HeaderTitle style={styles.headerTitle}>{title}</HeaderTitle>
      </View>
    );
  }
}

export default withNavigation(CustomHeader);
