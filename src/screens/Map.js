import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {MapView, Permissions, Location} from 'expo';
import Header from '../components/CustomHeader';
import COLORS from '../constants/colors';
import * as locationsActions from '../store/actions/locations';
import LoadingComponent from '../components/Loading';
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

const deltas = {
  latitudeDelta: 0.0622,
  longitudeDelta: 0.0421,
};

const {Marker} = MapView;

export class MapScreen extends Component {
  static propTypes = {
    fetchLocations: PropTypes.func.isRequired,
    locations: PropTypes.object.isRequired,
  };

  state = {
    region: null,
  };

  async componentDidMount() {
    const {fetchLocations} = this.props;

    await Permissions.askAsync(Permissions.LOCATION);
    await this.getUserLocation().then(coords => fetchLocations(coords.latitude, coords.longitude));
  }

  renderMarkers = () => {
    const {locations} = this.props;

    if (locations.isLoaded) {
      return locations.locationList.map(location => (
        <MapView.Marker
          key={location._id}
          title={location.name || ''}
          coordinate={{latitude: location.latitude, longitude: location.longitude}}
        />
      ));
    }
    return null;
  };

  getUserLocation = async () => {
    const userCurrentLocation = await Location.getCurrentPositionAsync({});

    const region = {
      latitude: userCurrentLocation.coords.latitude,
      longitude: userCurrentLocation.coords.longitude,
      ...deltas,
    };

    await this.setState({region});

    return {latitude: region.latitude, longitude: region.longitude};
  };

  render() {
    const {locations} = this.props;
    const {region} = this.state;

    const initialRegion = {
      latitude: 37.78825,
      longitude: -122.4324,
      ...deltas,
    };

    if (!locations.isLoaded) {
      return <LoadingComponent />;
    }

    return (
      <View style={styles.container}>
        <Header title="Map" style={styles.header} />
        {locations.error !== null && <Text style={{color: 'red'}}>{locations.error}</Text>}
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          region={region}
          initialRegion={{...initialRegion, ...deltas}}
          showsUserLocation
          showsMyLocationButton>
          {region !== null && this.renderMarkers()}
        </MapView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLocations: (latitude, longitude) => dispatch(locationsActions.dbGetLocations(latitude, longitude)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const locations = state.locations || {};

  return {
    locations,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
