import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import CustomDrawer from '../src/components/CustomDrawer';
import CustomHeader from '../src/components/CustomHeader';
import LoadingComp from '../src/components/Loading';
import SaveCupForm from '../src/components/SaveCupForm';
import * as TextComponents from '../src/components/TextComponents';
import StatsOverview from '../src/components/StatsOverview';
import AboutUs from '../src/screens/AboutUs';
import Home from '../src/screens/Home';
import LoadingScreen from '../src/screens/Loading';
import Login from '../src/screens/Login';
import Map from '../src/screens/Map';
import Profile from '../src/screens/Profile';
import QRScanner from '../src/screens/QRScanner';
import Settings from '../src/screens/Settings';
import SignUp from '../src/screens/SignUp';
import Stats from '../src/screens/Stats';

// App
it('App renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('App test against snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> CustomDrawer
it('CustomDrawer renders without crashing', () => {
  const rendered = renderer.create(<CustomDrawer />).toJSON();
  expect(rendered).toBeTruthy();
});

it('CustomDrawer test against snapshot', () => {
  const tree = renderer.create(<CustomDrawer />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> CustomHeader
it('CustomHeader renders without crashing', () => {
  const rendered = renderer.create(<CustomHeader />).toJSON();
  expect(rendered).toBeTruthy();
});

it('CustomHeader test against snapshot', () => {
  const tree = renderer.create(<CustomHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> Loading
it('Loading renders without crashing', () => {
  const rendered = renderer.create(<LoadingComp />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Loading test against snapshot', () => {
  const tree = renderer.create(<LoadingComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> SaveCupForm
it('SaveCupForm renders without crashing', () => {
  const rendered = renderer.create(<SaveCupForm />).toJSON();
  expect(rendered).toBeTruthy();
});

it('SaveCupForm test against snapshot', () => {
  const tree = renderer.create(<SaveCupForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> StatsOverview
it('StatsOverview renders without crashing', () => {
  const rendered = renderer.create(<StatsOverview />).toJSON();
  expect(rendered).toBeTruthy();
});

it('StatsOverview test against snapshot', () => {
  const tree = renderer.create(<StatsOverview />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> TextComponents
it('TextComponents renders without crashing', () => {
  const rendered = renderer.create(<TextComponents />).toJSON();
  expect(rendered).toBeTruthy();
});

it('TextComponents test against snapshot', () => {
  const tree = renderer.create(<TextComponents />).toJSON();
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
  const rendered = renderer.create(<Home />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Home test against snapshot', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Loading
it('Loading renders without crashing', () => {
  const rendered = renderer.create(<LoadingScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Loading test against snapshot', () => {
  const tree = renderer.create(<LoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Login
it('Login renders without crashing', () => {
  const rendered = renderer.create(<Login />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Login test against snapshot', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Map
it('Map renders without crashing', () => {
  const rendered = renderer.create(<Map />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Map test against snapshot', () => {
  const tree = renderer.create(<Map />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Profile
it('Profile renders without crashing', () => {
  const rendered = renderer.create(<Profile />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Profile test against snapshot', () => {
  const tree = renderer.create(<Profile />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> QRScanner
it('QRScanner renders without crashing', () => {
  const rendered = renderer.create(<QRScanner />).toJSON();
  expect(rendered).toBeTruthy();
});

it('QRScanner test against snapshot', () => {
  const tree = renderer.create(<QRScanner />).toJSON();
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
  const rendered = renderer.create(<SignUp />).toJSON();
  expect(rendered).toBeTruthy();
});

it('SignUp test against snapshot', () => {
  const tree = renderer.create(<SignUp />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Screens -> Stats
it('Stats renders without crashing', () => {
  const rendered = renderer.create(<Stats />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Stats test against snapshot', () => {
  const tree = renderer.create(<Stats />).toJSON();
  expect(tree).toMatchSnapshot();
});
