// Firebase creds got from console.firebase.google.com
export const firebaseConfig = {
  apiKey: 'AIzaSyCKHQbALlbnESV0U3hSA8kQXLFyBLvMFFk',
  authDomain: 'cupsave-e9b32.firebaseapp.com',
  databaseURL: 'https://cupsave-e9b32.firebaseio.com',
  projectId: 'cupsave-e9b32',
  storageBucket: 'cupsave-e9b32.appspot.com',
  messagingSenderId: '1058030936457',
};

export const reactReduxFirebaseConfig = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // Required with react-native v2.0.0 (http://react-redux-firebase.com/docs/integrations/react-native.html)
};

export default {firebaseConfig, reactReduxFirebaseConfig};
