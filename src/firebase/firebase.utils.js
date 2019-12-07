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

  export const createUserProfileDocument = async (userAuth,  addititonalData) => {
    // we want to save the user object if the user is signed in and not when its null
    if (!userAuth) return; // does not exists
    // query is us asking firestore for some document or collection
    // Firestore returns us two of objects i.e. references and snapshots
    // reference is simply an object that represent current place in the database thata we are asking for

    // we want to check whether or not we have store this particular user at that reference
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    // user does not exists in the database
    if (!snapShot.exists) {
        // getting displayName and email from the userAuth object
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            // we are making asynchronous request to out database to store this particular user
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...addititonalData
            })
        } catch (error) {
            console.log('error creating user ', error.message);

        }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  // provider for google
  const provider = new firebase.auth.GoogleAuthProvider();
  // setting custom parameters
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;