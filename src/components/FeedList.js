import React, {Component} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import FeedItem from './FeedItem';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: '95%',
    padding: 10,
    height: '100%',
  },
  list: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
});

class FeedList extends Component {
  renderItem = ({item}) => {
    return <FeedItem {...item[1]} />;
  };

  keyExtractor = item => item[0];

  render() {
    const {...props} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          {...props}
        />
      </View>
    );
  }
}

export default FeedList;
