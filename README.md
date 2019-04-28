# CupShare

An application that tracks a user’s ecological footprint of disposable coffee cups saved by purchasing drinks with a personal mug.

### Instructions for running test:

Write a test in `__tests__`
npm run test or
npm run testWithCoverage

## Instructions for building the application:

1. Clone the repository to your system using git clone
2. In an active shell, navigate to the project folder.
3. Run 'npm install' to install all necessary packages.
4. After packages have been installed, run 'npm run android' to launch the application on an emulator.
5. A server will start in your browser and begin bundling the Javascript. This may take awhile. After bundling, the application should be active on your emulated device.

## Commit style guidelines:

https://udacity.github.io/git-styleguide/

## Understanding the File Structure / Monorepo

- `/docs` - Documentation
- `/location_parser` Program to add businesses from Yelp Dataset to firebase firestore
- `/src` - Contains the source code for native (ios and android)
  - `/components` - presentational components that sit inside containers. [Read More](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
  - `/constants` - Shared variables that don't change
  - `/screens` - Components that connect logic to components (hold components), represent the various screens in the app [Read More](https://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components)
  - `/data` - Exports initialization code for external libraries
    - `/services` - Exports classes with functions to interact with the external library related code (interaction)
  - `/assets` - Images/fonts shared across platforms
  - `/navigation` - Hook up the navigation sidebar and routes with any & all screens [Read More](https://reactnavigation.org/docs/en/getting-started.html)
  - `/store` - Redux Store - hooks up the stores and provides initial/template states [Read More](https://redux.js.org/docs/basics/Store.html)
    - `/actions` - Redux Actions - payloads of information that send data _from_ your application _to_ your store. [Read More](https://redux.js.org/docs/basics/Actions.html)
    - `/reducers` - Redux Reducers - Actions dispatch to reducers, which actually change the state (and log the results of actions) [Read More](https://redux.js.org/docs/basics/Reducers.html)
