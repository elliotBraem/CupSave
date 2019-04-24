import React, {Component} from 'react';
import {LayoutAnimation, RefreshControl, Text} from 'react-native';
import PropTypes from 'prop-types';
import {withHandlers, compose} from 'recompose';
import {connect} from 'react-redux';
import {withFirebase, withFirestore, isLoaded} from 'react-redux-firebase';
import {spinnerWhileLoading} from '../utils/components';
import Loading from './Loading';
import COLORS from '../constants/colors';
import FeedList from './FeedList';
import {AppText} from './TextComponents';
// import console = require('console');

// // Set the default number of images to load for each pagination.
// const PAGE_SIZE = 5;

class LiveFeed extends Component {
  static propTypes = {
    // profile: PropTypes.shape({
    //   friends: PropTypes.shape.isRequired,
    // }).isRequired,
    firestore: PropTypes.shape({
      collection: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      posts: [],
      data: {},
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  // Append the item to our states `data` prop
  addPosts = posts => {
    this.setState(previousState => {
      let data = {
        ...previousState.data,
        ...posts,
      };
      return {
        data,
        // Sort the data by timestamp
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp),
      };
    });
  };

  // Call our database and ask for a subset of the user posts
  makeRemoteRequest = async lastKey => {
    // If we are currently getting posts, then bail out..
    if (this.state.loading) {
      return;
    }
    this.setState({loading: true});

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const {data, cursor} = await this.fetchPosts({
      start: lastKey,
    });

    this.lastKnownKey = cursor;
    // Iteratively add posts
    const posts = {};
    for (let child of data) {
      posts[child.key] = child;
    }
    this.addPosts(posts);

    // Finish loading, this will stop the refreshing animation.
    this.setState({loading: false});
  };

  // Because we want to get the most recent items, don't pass the cursor back.
  // This will make the data base pull the most recent items.
  _onRefresh = () => this.makeRemoteRequest();

  fetchPosts() {
    const {firestore} = this.props;
    firestore
      .collection('users')
      .orderBy('timestamp', 'desc')
      .get()
      .then(function gatherAllUsers(querySnapshot) {
        querySnapshot.forEach(function filterFriends(doc) {
          console.log(doc.data().consumption.total);
        });
      });
  }

  // // If we press the "Load More..." footer then get the next page of posts
  // onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey);

  render() {
    // Let's make everything purrty by calling this method which animates layout changes.
    LayoutAnimation.easeInEaseOut();
    const {loading, posts} = this.state;

    return (
      <FeedList
        refreshControl={<RefreshControl refreshing={loading} onRefresh={this._onRefresh} />}
        // onPressFooter={this.onPressFooter}
        data={posts}
      />
    );
  }
}

const enhance = compose(
  withFirestore
  // withFirebase,
  // connect(({firebase: {profile}}) => ({
  //   profile,
  // })),
  // spinnerWhileLoading(['profile'])
);

export default enhance(LiveFeed);
