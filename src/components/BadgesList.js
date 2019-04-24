import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import BadgeItem from './BadgeItem';

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

class BadgesList extends Component {
  renderItem = ({item}) => <BadgeItem {...item} />;

  keyExtractor = item => item.key;

  render() {
    const {...props} = this.props;
    // console.log(data);
    return <FlatList keyExtractor={this.keyExtractor} renderItem={this.renderItem} {...props} />;
  }
}

export default BadgesList;
