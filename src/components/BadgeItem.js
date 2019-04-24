import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class BadgeItem extends React.Component {
  state = {};

  render() {
    const {badge} = this.props;
    console.log(this.props);

    return (
      <View>
        <Text>{badge}</Text>
      </View>
    );
  }
}

BadgeItem.propTypes = {
  badge: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const {data} = state;
  return {badges: data};
};

export default connect(mapStateToProps)(BadgeItem);
