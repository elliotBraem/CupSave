import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, TouchableOpacity, TextInput, Platform, YellowBox} from 'react-native';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as authActions from '../store/actions/auth';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 0,
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
  headerText: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold"
  },
  menuContent: {
    color: "#000",
    fontWeight: "bold",
    padding: 2,
    fontSize: 20
  }
});

class ChangeCupSize extends Component {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
    this.state = {
      errorMessage: null,
      CupSize: null,
    };
  }

  handleCupChange = async () => {
    const {updateProfile, auth} = this.props;
    const {CupSize} = this.state;
    updateProfile({cupVolumeOz: CupSize}).then(() => { console.log("success");  console.log(auth);}).catch( error => { console.log(error); });
  };

  render() {
    const {errorMessage, CupSize} = this.state;
    return (
      <MenuProvider style={{ flexDirection: "column", padding: 30 }}>
        <View style={styles.container}>
        <Menu onSelect={value => this.setState({CupSize: value})}>

          <MenuTrigger  >
          <Text style={styles.headerText}>{CupSize}oz</Text>
          </MenuTrigger  >

          <MenuOptions>
            <MenuOption value={12}>
              <Text style={styles.menuContent}>12oz</Text>
            </MenuOption>
            <MenuOption value={16}>
              <Text style={styles.menuContent}>16oz</Text>
            </MenuOption>
            <MenuOption value={20}>
              <Text style={styles.menuContent}>20oz</Text>
            </MenuOption>
          </MenuOptions>

        </Menu>
        <TouchableOpacity style={styles.btnStyle} onPress={this.handleCupChange}>
          <Text>Change Cup Size</Text>
        </TouchableOpacity>
        </ View>
      </MenuProvider>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProfile: formData => dispatch(authActions.dbUpdateProfile(formData)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const auth = state.auth || {};

  return {
    auth,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeCupSize);
