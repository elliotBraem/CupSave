import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';
import AboutUs from '../src/screens/AboutUs';
import {HomeScreen} from '../src/screens/Home';
import {LoadingScreen} from '../src/screens/Loading';
import {LoginScreen} from '../src/screens/Login';
import {MapScreen} from '../src/screens/Map';
import {ProfileScreen} from '../src/screens/Profile';
import {QRScannerScreen} from '../src/screens/QRScanner';
import Settings from '../src/screens/Settings';
import {SignUpScreen} from '../src/screens/SignUp';

// App
it('App renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('App test against snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> AboutUs
it('AboutUs renders without crashing', () => {
  const rendered = renderer.create(<AboutUs />).toJSON();
  expect(rendered).toBeTruthy();
});

it('AboutUs test against snapshot', () => {
  const tree = renderer.create(<AboutUs />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Home
it('Home renders without crashing', () => {
  console.error = jest.fn();
  const rendered = renderer.create(<HomeScreen auth={{user: {}, isLoaded: true}} />).toJSON();
  expect(rendered).toBeTruthy();
  expect(console.error).toHaveBeenCalled();
});

it('Home test against snapshot', () => {
  const tree = renderer.create(<HomeScreen auth={{user: {}, isLoaded: true}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Loading
it('Loading renders without crashing', () => {
  const rendered = renderer
    .create(<LoadingScreen auth={{isAuthenticated: true}} navigation={{navigate: () => {}}} />)
    .toJSON();
  expect(rendered).toBeTruthy();
});

it('Loading test against snapshot', () => {
  const tree = renderer
    .create(<LoadingScreen auth={{isAuthenticated: true}} navigation={{navigate: () => {}}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Login
it('Login renders without crashing', () => {
  console.error = jest.fn();
  const rendered = renderer.create(<LoginScreen />).toJSON();
  expect(rendered).toBeTruthy();
  expect(console.error).toHaveBeenCalled();
});

it('Login test against snapshot', () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Map
it('Map renders without crashing', () => {
  console.error = jest.fn();
  const rendered = renderer.create(<MapScreen locations={{isLoaded: true}} />).toJSON();
  expect(rendered).toBeTruthy();
  expect(console.error).toHaveBeenCalled();
});

it('Map test against snapshot', () => {
  const tree = renderer.create(<MapScreen locations={{isLoaded: true}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Profile
it('Profile renders without crashing', () => {
  console.error = jest.fn();
  const rendered = renderer.create(<ProfileScreen auth={{user: {}, isLoaded: true}} />).toJSON();
  expect(rendered).toBeTruthy();
  expect(console.error).toHaveBeenCalled();
});

it('Profile test against snapshot', () => {
  const tree = renderer.create(<ProfileScreen auth={{user: {}, isLoaded: true}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> QRScanner
it('QRScanner renders without crashing', () => {
  console.error = jest.fn();
  const rendered = renderer.create(<QRScannerScreen />).toJSON();
  expect(rendered).toBeTruthy();
  expect(console.error).toHaveBeenCalled();
});

it('QRScanner test against snapshot', () => {
  const tree = renderer.create(<QRScannerScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Settings
it('Settings renders without crashing', () => {
  const rendered = renderer.create(<Settings />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Settings test against snapshot', () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> SignUp
it('SignUp renders without crashing', () => {
  console.error = jest.fn();
  const rendered = renderer.create(<SignUpScreen />).toJSON();
  expect(rendered).toBeTruthy();
  expect(console.error).toHaveBeenCalled();
});

it('SignUp test against snapshot', () => {
  const tree = renderer.create(<SignUpScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
