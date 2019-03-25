import React from 'react';
import {Provider} from 'react-redux';
import createStore from 'store';
import Home from 'components/Home';

// Store Initialization
const initialState = {firebase: {}};
const store = createStore(initialState);

const Main = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default Main;
