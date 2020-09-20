import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4PrkuiQqKR-cJNKd1hU6eJJDj1GczRY8",
  authDomain: "followupper-790d3.firebaseapp.com",
  databaseURL: "https://followupper-790d3.firebaseio.com",
  projectId: "followupper-790d3",
  storageBucket: "followupper-790d3.appspot.com",
  messagingSenderId: "571597173324",
  appId: "1:571597173324:web:d21b485b8090dbc69dbae9",
  measurementId: "G-SWW64FRSBN"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };