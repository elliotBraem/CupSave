import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import COLORS from '../constants/colors';
import BadgesList from './BadgesList';
import {TitleText} from './TextComponents';

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 130,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    marginTop: 15,
  },
  title: {
    marginTop: 15,
    marginLeft: 30,
  },
});

class BadgesContainer extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    badges: PropTypes.object.isRequired,
    firestore: PropTypes.shape({
      collection: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.requestBadges();
  }

  async requestBadges() {
    const {loading} = this.state;
    if (loading) {
      return;
    }
    this.setState({loading: true});
    const {firestore, badges} = this.props;
    const newData = await Object.keys(badges).map(key => {
      const ref = firestore.collection('badges').doc(key);
      return ref.get().then(function getBadge(doc) {
        if (doc.exists) {
          return doc.data();
        }
      });
    });
    this.setState({data: newData});
    this.setState({loading: false});
  }

  render() {
    const {data} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <TitleText>My Badges</TitleText>
        </View>
        <BadgesList data={data} />
      </View>
    );
  }
}

const enhance = compose(
  withFirebase,
  withFirestore,
  connect(({firebase: {profile}}) => ({
    badges: profile.badges,
  }))
);

export default enhance(BadgesContainer);
