/* global require */
import React from 'react';
import {Font} from 'expo';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingComponent from './components/Loading';
import AppContainer from './navigation/AppNavigation';

class Root extends React.Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
  };

  state = {
    isLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      /* eslint-disable global-require */
      'open-sans-light': require('./assets/fonts/OpenSans/OpenSans-Light.ttf'),
      'open-sans-regular': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
      'open-sans-semibold': require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
      /* eslint-enable global-require */
    });

    this.setState({
      isLoaded: true,
    });
  }

  render() {
    const {isLoaded} = this.state;
    const {store, persistor} = this.props;

    if (!isLoaded) {
      return <LoadingComponent />;
    }

    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingComponent />} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default Root;
