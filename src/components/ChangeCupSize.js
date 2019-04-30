import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Picker} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as authActions from '../store/actions/auth';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '90%',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    marginBottom: 20,
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  btnStyle: {
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class ChangeCupSize extends Component {
  static propTypes = {
    updateCupSize: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      cupSize: 0,
    };
  }

  handleCupChange = async () => {
    const {cupSize} = this.state;
    const {updateCupSize} = this.props;
    updateCupSize(cupSize);
  };

  render() {
    const {cupSize} = this.state;
    return (
      <View style={styles.container}>
        <Picker selectedValue={cupSize} onValueChange={(itemValue, itemIndex) => this.setState({cupSize: itemValue})}>
          <Picker.Item label="12oz" value={12} />
          <Picker.Item label="16oz" value={16} />
          <Picker.Item label="20oz" value={20} />
          <Picker.Item label="32oz" value={32} />
        </Picker>
        <TouchableOpacity style={styles.btnStyle} onPress={this.handleCupChange}>
          <Text>Change Cup Size</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCupSize: newCupSize => dispatch(authActions.dbUpdateCupSize(newCupSize)),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    cupSize: state.auth.cupVolumeOz || 16,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeCupSize);
