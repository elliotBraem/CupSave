# CupShare
An application that tracks a user’s ecological footprint of disposable coffee cups saved by purchasing drinks with a personal mug.

### Commit style guidelines:
https://udacity.github.io/git-styleguide/

## Understanding the File Structure
- `/docs` - Documentation
- `/src` - Contains the source code for native (ios and android)
    - `/components` - presentational components that sit inside containers. [Read More](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
    - `/constants` - Shared variables that don't change
    - `/screens` - Components that connect logic to components (hold components), represent the various screens in the app [Read More](https://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components)
    - `/services` - Exports classes with functions to interact with the external library related code (initialization and interaction)
    - `/assets` - Images/fonts shared across platforms
    - `/navigation` - Hook up the navigation sidebar and routes with any & all screens [Read More](https://reactnavigation.org/docs/en/getting-started.html)
    - `/store` - Redux Store - hooks up the stores and provides initial/template states [Read More](https://redux.js.org/docs/basics/Store.html)
        - `/actions` - Redux Actions - payloads of information that send data _from_ your application _to_ your store. [Read More](https://redux.js.org/docs/basics/Actions.html)
        - `/reducers` - Redux Reducers - Actions dispatch to reducers, which actually change the state (and log the results of actions) [Read More](https://redux.js.org/docs/basics/Reducers.html)

Important library we're using to connect to firebase: https://github.com/prescottprue/react-redux-firebase#use
