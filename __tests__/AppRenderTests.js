import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import CustomDrawer from '../src/components/CustomDrawer';
import CustomHeader from '../src/components/CustomHeader';
import Loading from '../src/components/Loading';
import SaveCupForm from '../src/components/SaveCupForm';

it('App renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('App test against snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('CustomDrawer renders without crashing', () => {
  const rendered = renderer.create(<CustomDrawer />).toJSON();
  expect(rendered).toBeTruthy();
});

it('CustomDrawer test against snapshot', () => {
  const tree = renderer.create(<CustomDrawer />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Loading renders without crashing', () => {
  const rendered = renderer.create(<Loading />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Loading test against snapshot', () => {
  const tree = renderer.create(<Loading />).toJSON();
  expect(tree).toMatchSnapshot();
});