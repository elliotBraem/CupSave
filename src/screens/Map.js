/* global navigator */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import {Permissions} from 'expo';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';
import * as locationsActions from '../store/actions/locations';
import Loading from '../components/Loading';
import mapStyle from '../constants/mapStyle';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
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

class MapScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    fetchLocations: PropTypes.func.isRequired,
    locations: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    // title: 'Map',
  };

  state = {
    userLocation: null,
  };

  constructor(props) {
    super(props);
    const {fetchLocations, locations} = props;

    if (!locations.isLoaded) {
      fetchLocations();
    }

    this.getUserLocation();
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.LOCATION);
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

  getUserMap = ({userLocation, locations}) => {
    let userLocationMarker = null;

    if (userLocation) {
      userLocationMarker = <Marker coordinate={userLocation} />;
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
          customMapStyle={mapStyle}
          region={userLocation}>
          {userLocationMarker}
          {locations.length > 0 &&
            locations.map(marker => (
              <Marker
                key={marker._id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.name}
              />
            ))}
        </MapView>
      </View>
    );
  };

  render() {
    const {locations} = this.props;
    const {userLocation} = this.state;

    if (!locations.isLoaded || locations.length === 0) {
      return <Loading />;
    }

    const UserMap = this.getUserMap({style: styles.map, userLocation, locations});

    return (
      <View style={styles.container}>
        <CustomHeader title="Map" style={styles.header} />
        {/* <Text style={styles.header}>Map</Text>
        <Button title="Menu" onPress={() => navigation.openDrawer()} style={styles.btnStyle} />
        <Button title="Get Location" onPress={() => this.getUserLocation()} style={styles.btnStyle} /> */}
        <UserMap />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLocations: () => dispatch(locationsActions.dbGetLocations()),
  };
};

const mapStateToProps = (state, ownProps) => {
  const locations = state.locations || {};

  console.log(locations);

  return {
    locations,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
