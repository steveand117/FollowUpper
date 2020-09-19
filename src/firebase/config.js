import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD4PrkuiQqKR-cJNKd1hU6eJJDj1GczRY8',
  authDomain: 'followupper-790d3.firebaseapp.com',
  databaseURL: 'https://followupper-790d3.firebaseio.com/',
  projectId: 'followupper-790d3',
  storageBucket: 'gs://followupper-790d3.appspot.com',
  messagingSenderId: '12345-insert-yourse',
  appId: '1:571597173324:android:adadc9d799dde5389dbae9',
  appleAppId: '1:571597173324:ios:dcd0f6b7378126e29dbae9'
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };