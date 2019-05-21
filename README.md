# CupSave
![CupSave Logo](https://i.ibb.co/mqmXmrv/cupsave-circle.png) 

Every year the United States alone throws away 50 billion disposable coffee cups. The majority of these
coffee cups end up in landfills, in incinerators, or in our oceans. 

A simple yet effective response to this problem is to use reusable cups and mugs; a solution that many people already implement in their day to day lives. 

To reward people for using reusable cups, we developed CupSave, an application that tracks a user’s ecological footprint of disposable coffee cups saved by purchasing drinks with a personal mug.

CupSave lists participating cafes in a map format, lets users log in with different devices, and
scan café-specific QR codes when purchasing their drinks. Using this data, statistics are compiled on the profile screen to represent the user's saved footprint. 

### Tour

![Tour of CupSave App](https://thumbs.gfycat.com/EnlightenedBossyAmericanbittern-size_restricted.gif)

## Instructions for building the application:

1. Clone the repository to your system
 ```
git clone https://github.com/elliotBraem/CupSave.git
```

2. In the project folder, install all necessary packages and dependencies
```
npm install
```

3. Create a .env file (based on the .envexample) in the root directory with the credential from firebase: 
```
API_KEY=
AUTH_DOMAIN=
DATABASE_URL=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
```
Our credentials are available on request: please contact [elliotBraem](https://github.com/elliotBraem) or another contributer.

4. Launch the application on an emulator
```
npm run start
```

5. A server will start in your browser and begin bundling the Javascript. This may take awhile. After bundling, the application should be active on your emulated device.

## Instructions for running and creating tests:

Write a test in `__tests__`
npm run test or
npm run testWithCoverage

The tests currently test the actions being called, the validity of the Redux state being changed after our reducers are used, and the rendering of our components and screens. Tests are still needed for our services and for our interactions with firebase.

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

## Built With

* [React Native](https://facebook.github.io/react-native/) - Native framework
* [Redux](https://react-redux.js.org) - State management
* [Firebase](https://firebase.google.com) - Database
* [Expo](https://expo.io) - Emulator and toolchain for React Native
* [Jest](https://jestjs.io) - Testing framework

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

See the list of [contributors](https://github.com/elliotBraem/CupSave/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
