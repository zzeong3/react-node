
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBgojrKxoKun6El3DWopi68Qv4SonzK2j4",
    authDomain: "dcode-community-cc656.firebaseapp.com",
    projectId: "dcode-community-cc656",
    storageBucket: "dcode-community-cc656.appspot.com",
    messagingSenderId: "1051319194031",
    appId: "1:1051319194031:web:8950ffe8367d6765819f5a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;