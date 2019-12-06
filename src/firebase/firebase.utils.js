// set up firebase utitlty methods
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyBtWXuP2V4qjF-Gwj_8xw3x6jqDJK_VC2Q",
    authDomain: "ecommerce-app-7662a.firebaseapp.com",
    databaseURL: "https://ecommerce-app-7662a.firebaseio.com",
    projectId: "ecommerce-app-7662a",
    storageBucket: "ecommerce-app-7662a.appspot.com",
    messagingSenderId: "754416381207",
    appId: "1:754416381207:web:08bae47ffbae32a304db52",
    measurementId: "G-NS6ME356NL"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  // provider for google
  const provider = new firebase.auth.GoogleAuthProvider();
  // setting custom parameters
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;