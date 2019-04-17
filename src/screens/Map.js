import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  mapContainer: {
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

const UserMap = ({userLocation}) => {
  let userLocationMarker = null;

  if (userLocation) {
    userLocationMarker = <MapView.Marker coordinate={userLocation} />;
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        region={userLocation}>
        {userLocationMarker}
      </MapView>
    </View>
  );
};

class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocation: null,
    };
  }

  static navigationOptions = {
    // title: 'Map',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    this.getUserLocation();
  }

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0421,
          },
        });
      },
      err => console.log(err)
    );
  };

  render() {
    const {userLocation} = this.state;
    return (
      <View style={styles.container}>
        <CustomHeader title="Map" />
        {/* <Text style={styles.header}>Map</Text>
        <Button title="Menu" onPress={() => navigation.openDrawer()} style={styles.btnStyle} />
        <Button title="Get Location" onPress={() => this.getUserLocation()} style={styles.btnStyle} /> */}
        <UserMap style={styles.map} userLocation={userLocation} />
      </View>
    );
  }
}

export default MapScreen;
