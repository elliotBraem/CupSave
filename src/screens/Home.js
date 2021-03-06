import React, {Component} from 'react';
import {StyleSheet, View, Platform, TouchableOpacity, Dimensions, Image} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SaveCupForm from '../components/SaveCupForm';
import LiveFeed from '../components/LiveFeed';
import Header from '../components/CustomHeader';
import COLORS from '../constants/colors';
import * as authActions from '../store/actions/auth';
import Logo from '../assets/images/logo.png';
import {WorldCounterText, SaveACupText, SaveTheWorldText} from '../components/TextComponents';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  inner: {
    paddingTop: Platform.OS === 'ios' ? 100 : 100 - 24,
    alignItems: 'center',
  },
  modalContainer: {
    alignSelf: 'center',
  },
  modal: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: COLORS.secondary,
    width: Dimensions.get('window').width,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 60 - 24,
  },
  modalLogo: {
    width: 150,
    height: 239,
    marginTop: 40,
  },
});

export class HomeScreen extends Component {
  static propTypes = {
    incrementConsumption: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        consumption: PropTypes.shape({
          history: PropTypes.object.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    fetchAuthData: PropTypes.func.isRequired,
  };

  state = {isModalVisible: false};

  componentDidMount = () => {
    const {fetchAuthData, auth} = this.props;

    if (!auth.isAuthenticated || !auth.isLoaded) {
      fetchAuthData();
    }
  };

  _toggleModal = () => {
    const {isModalVisible} = this.state;
    this.setState({isModalVisible: !isModalVisible});
  };

  render() {
    const {auth, incrementConsumption} = this.props;
    const {isModalVisible} = this.state;

    // if (!auth.isLoaded) {
    //   return <Loading />;
    // }

    return (
      <View style={styles.container}>
        <Header title="Home" />
        <View style={styles.inner}>
          <SaveCupForm onSaveCupFormSubmit={incrementConsumption} handleModal={this._toggleModal} />
          <LiveFeed feedContent={auth.user.consumption.history} />
        </View>
        <Modal style={styles.modalContainer} isVisible={isModalVisible}>
          <TouchableOpacity style={styles.modal} onPress={this._toggleModal}>
            <Image source={Logo} style={styles.modalLogo} />
            <WorldCounterText style={styles.worldCounterText}>121,436 cups saved world wide!</WorldCounterText>
            <SaveACupText style={styles.saveACupText}>SAVE A CUP</SaveACupText>
            <SaveTheWorldText style={styles.saveTheWorldText}>save the world</SaveTheWorldText>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    incrementConsumption: (drinkValue, locationEnabled) =>
      dispatch(authActions.dbIncrementConsumption(drinkValue, locationEnabled)),
    fetchAuthData: () => dispatch(authActions.dbOnAuthorizeStateChange()),
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
)(HomeScreen);
