import FirebaseModule from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from '../constants/firebase';

const {projectId, apiKey, authDomain, storageBucket, messagingSenderId, databaseURL} = firebaseConfig;

try {
  FirebaseModule.initializeApp({
    projectId,
    apiKey,
    authDomain,
    databaseURL,
    messagingSenderId,
    storageBucket,
  });
} catch (error) {
  console.error('===========FIREBASE INITIALIZATION ERROR===========');
  console.error(error);
  console.error('====================================');
}

// Initialize firestore service on firebase instance
export const FirestoreRef = FirebaseModule.firestore();

export const StorageRef = FirebaseModule.storage();

export default FirebaseModule;
