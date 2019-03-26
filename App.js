import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import configureStore from './src/store';
import Loading from './src/components/Loading';
import AppContainer from './src/navigation';

const initialState = window.__INITIAL_STATE__ || {
  firebase: {
    authError: null,
  },
};

const {store, persistor} = configureStore(initialState);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
