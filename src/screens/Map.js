import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {MapView, Permissions, Location} from 'expo';
import CustomHeader from '../components/CustomHeader';
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

const Marker = MapView.Marker;

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
    region: null,
  };

  constructor(props) {
    super(props);
    const {fetchLocations, locations} = props;

    if (!locations.isLoaded) {
      fetchLocations();
    }
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.LOCATION);
    this.getUserLocation();
  }

  renderMarkers = () => {
    const {locations} = this.props;

    console.log(locations.map((location, i) => <li>{location.name}</li>));

    // const test = locations.map(location => (
    //   <Marker
    //     key={location._id}
    //     title={location.name || ''}
    //     coordinate={{latitude: location.latitude, longitude: location.longitude}}
    //   />
    // ));

    //console.log(test);

    return <MapView.Marker key="1" title="test" coordinate={{latitude: 50, longitude: 50}} />

    if (locations) {
      return locations.map(location => (
        <MapView.Marker
          key={location._id}
          title={location.name || ''}
          coordinate={{latitude: location.latitude, longitude: location.longitude}}
        />
      ));
    }
  };

  getUserLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas,
    };

    await this.setState({region});
  };

  render() {
    const {locations} = this.props;
    const {region} = this.state;

    const initialRegion = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };

    if (!locations.isLoaded) {
      return <LoadingComponent />;
    }

    return (
      <View style={styles.container}>
        <CustomHeader title="Map" style={styles.header} />
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          region={region}
          initialRegion={{...initialRegion, ...deltas}}
          showsUserLocation
          showsMyLocationButton>
          {this.renderMarkers()}
        </MapView>
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

  return {
    locations,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
