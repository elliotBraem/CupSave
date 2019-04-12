import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {withNavigation} from 'react-navigation';
import BurgerIcon from '../assets/images/drawer-icons/burger-icon.svg';
import {HeaderTitle} from './TextComponents';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    height: Platform.OS === 'ios' ? 70 : 70 - 24,
    marginTop: Platform.OS === 'ios' ? 30 : 30 - 24,
    alignContent: 'center',
    flexDirection: 'row',
  },
  burgerIcon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 20,
  },
});

const CustomHeader = ({navigation, title}) => {
  return (
    <View style={styles.container}>
      <BurgerIcon style={styles.burgerIcon} onPress={() => navigation.toggleDrawer()} />
      <HeaderTitle style={styles.headerTitle}>{title}</HeaderTitle>
    </View>
  );
};

CustomHeader.propTypes = {
  navigation: PropTypes.shape({
    toggleDrawer: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

const enhance = compose(withNavigation);

export default enhance(CustomHeader);
