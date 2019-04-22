import React, {Component} from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {withHandlers, compose} from 'recompose';
import {connect} from 'react-redux';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import COLORS from '../constants/colors';
import {AppText} from './TextComponents';

import FeedItem from './FeedItem';

class FeedList extends Component {
  renderItem = ({item}) => <FeedItem {...item} />;
  keyExtractor = item => item.key;

  render() {
    const {onPressFooter, ...props} = this.props;
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => <Footer {...footerProps} onPress={onPressFooter} />}
        renderItem={this.renderItem}
        {...props}
      />
    );
  }
}

const enhance = compose(withFirebase);

export default enhance(FeedList);
