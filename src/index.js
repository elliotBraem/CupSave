import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
import LoadingComponent from './components/Loading';
import AppContainer from './navigation/AppNavigation';

const {persistor, store} = configureStore();
// persistor.purge(); // Debug to clear persist

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingComponent />} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);

export default App;
