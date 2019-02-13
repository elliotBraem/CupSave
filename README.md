# CupShare
An application that tracks a user’s ecological footprint of disposable coffee cups saved by purchasing drinks with a personal mug.

## Understanding the File Structure
- `/docs` - Documentation
- `/src` - Contains the source code for native (ios and android)
    - `/components` - presentational components that sit inside containers. [Read More](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
    - `/constants` - Shared variables that don't change
    - `/containers` - Components that connect logic to components (hold components) [Read More](https://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components)
    - `/data` - Holds firebase related code (initialization and interaction)
        - `/services` - Exports classes with functions to interact with the database/authentication
    - `/images` - Images shared across platforms
    - `/routes` - wire up the router with any & all screens [Read More](https://github.com/aksonov/react-native-router-flux)
    - `/store` - Redux Store - hooks up the stores and provides initial/template states [Read More](https://redux.js.org/docs/basics/Store.html)
        - `/actions` - Redux Actions - payloads of information that send data _from_ your application _to_ your store. [Read More](https://redux.js.org/docs/basics/Actions.html)
        - `/reducers` - Redux Reducers - Actions dispatch to reducers, which actually change the state (and log the results of actions) [Read More](https://redux.js.org/docs/basics/Reducers.html)
