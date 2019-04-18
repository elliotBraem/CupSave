import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Flatlist} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
});

class SearchScreen extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };

  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {search} = this.state;
    return (
      <View style={styles.container}>
        <CustomHeader title="Search" />
        <SearchBar lightTheme placeholder="Type Here..." onChangeText={this.updateSearch} value={search} />
      </View>
    );
  }
}

export default SearchScreen;
