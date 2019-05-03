import React from 'react';
import renderer from 'react-test-renderer';

import {CustomDrawer} from '../src/components/CustomDrawer';
import {CustomHeader} from '../src/components/CustomHeader';
import LoadingComp from '../src/components/Loading';
import SaveCupForm from '../src/components/SaveCupForm';
import {AppText, StatText, StatSubtext, TitleText, HeaderTitle} from '../src/components/TextComponents';
import StatsOverview from '../src/components/StatsOverview';

// Components -> CustomDrawer
it('CustomDrawer renders without crashing', () => {
  console.error = jest.fn();
  const rendered = renderer.create(<CustomDrawer auth={{user: {email: 'test@test.com'}}} />).toJSON();
  expect(rendered).toBeTruthy();
  expect(console.error).toHaveBeenCalled();
});

it('CustomDrawer test against snapshot', () => {
  const tree = renderer.create(<CustomDrawer auth={{user: {email: 'test@test.com'}}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> CustomHeader
it('CustomHeader renders without crashing', () => {
  console.error = jest.fn();
  const rendered = renderer.create(<CustomHeader />).toJSON();
  expect(rendered).toBeTruthy();
  expect(console.error).toHaveBeenCalled();
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

// Components -> TextComponents -> AppText
it('AppText renders without crashing', () => {
  const rendered = renderer.create(<AppText />).toJSON();
  expect(rendered).toBeTruthy();
});

it('AppText test against snapshot', () => {
  const tree = renderer.create(<AppText />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> TextComponents -> StatText
it('StatText renders without crashing', () => {
  const rendered = renderer.create(<StatText />).toJSON();
  expect(rendered).toBeTruthy();
});

it('StatText test against snapshot', () => {
  const tree = renderer.create(<StatText />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> TextComponents -> StatSubtext
it('StatSubtext renders without crashing', () => {
  const rendered = renderer.create(<StatSubtext />).toJSON();
  expect(rendered).toBeTruthy();
});

it('StatSubtext test against snapshot', () => {
  const tree = renderer.create(<StatSubtext />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> TextComponents -> TitleText
it('TitleText renders without crashing', () => {
  const rendered = renderer.create(<TitleText />).toJSON();
  expect(rendered).toBeTruthy();
});

it('TitleText test against snapshot', () => {
  const tree = renderer.create(<TitleText />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Components -> TextComponents -> HeaderTitle
it('HeaderTitle renders without crashing', () => {
  const rendered = renderer.create(<HeaderTitle />).toJSON();
  expect(rendered).toBeTruthy();
});

it('HeaderTitle test against snapshot', () => {
  const tree = renderer.create(<HeaderTitle />).toJSON();
  expect(tree).toMatchSnapshot();
});
