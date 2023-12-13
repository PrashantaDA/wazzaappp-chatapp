import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const auth = firebase
  .initializeApp({
    apiKey: 'AIzaSyAvyAz4FFCRqmEYL_j96RyZ1xtx1ZkqikA',
    authDomain: 'wazzaappp-df051.firebaseapp.com',
    projectId: 'wazzaappp-df051',
    storageBucket: 'wazzaappp-df051.appspot.com',
    messagingSenderId: '31337054255',
    appId: '1:31337054255:web:562324fe9729b1fe2a86da',
  })
  .auth();
