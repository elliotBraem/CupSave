import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {withHandlers, compose} from 'recompose';
import {connect} from 'react-redux';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import COLORS from '../constants/colors';
import {AppText} from './TextComponents';

const profileImageSize = 36;
const padding = 12;

const styles = StyleSheet.create({
  // row: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // padding: {
  //   padding,
  // },
  // avatar: {
  //   aspectRatio: 1,
  //   backgroundColor: '#D8D8D8',
  //   borderWidth: StyleSheet.hairlineWidth,
  //   borderColor: '#979797',
  //   borderRadius: profileImageSize / 2,
  //   width: profileImageSize,
  //   height: profileImageSize,
  //   resizeMode: 'cover',
  //   marginRight: padding,
  // },
});

class FeedItem extends Component {
  state = {};

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({width, height});
      });
    }
  }

  render() {
    const {text, name, imageWidth, imageHeight, uid, image} = this.props;

    // Reduce the name to something
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    return (
      <View>
        <Header image={{uri: image}} name={name} />
        <Image
          resizeMode="contain"
          style={{
            backgroundColor: '#D8D8D8',
            width: '100%',
            aspectRatio: aspect,
          }}
          source={{uri: image}}
        />
        <Metadata name={name} description={text} />
      </View>
    );
  }
}

const Metadata = ({name, description}) => (
  <View style={styles.padding}>
    <IconBar />
    <Text style={styles.text}>{name}</Text>
    <Text style={styles.subtitle}>{description}</Text>
  </View>
);

const Header = ({name, image}) => (
  <View style={[styles.row, styles.padding]}>
    <View style={styles.row}>
      <Image style={styles.avatar} source={image} />
      <Text style={styles.text}>{name}</Text>
    </View>
    <Icon name="ios-more" />
  </View>
);

const Icon = ({name}) => <Ionicons style={{marginRight: 8}} name={name} size={26} color="black" />;

const IconBar = () => (
  <View style={styles.row}>
    <View style={styles.row}>
      <Icon name="ios-heart-outline" />
      <Icon name="ios-chatbubbles-outline" />
      <Icon name="ios-send-outline" />
    </View>
    <Icon name="ios-bookmark-outline" />
  </View>
);

const enhance = compose(withFirebase);

export default enhance(FeedItem);
