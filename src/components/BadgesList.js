import React, {Component} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import BadgeItem from './BadgeItem';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
});

class BadgesList extends Component {
  renderItem = ({item}) => <BadgeItem {...item} />;

  keyExtractor = item => item._id;

  render() {
    const {...props} = this.props;
    // console.log(data);
    return (
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        {...props}
      />
    );
  }
}

export default BadgesList;
