// set up firebase utitlty methods
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBtWXuP2V4qjF-Gwj_8xw3x6jqDJK_VC2Q",
  authDomain: "ecommerce-app-7662a.firebaseapp.com",
  databaseURL: "https://ecommerce-app-7662a.firebaseio.com",
  projectId: "ecommerce-app-7662a",
  storageBucket: "ecommerce-app-7662a.appspot.com",
  messagingSenderId: "754416381207",
  appId: "1:754416381207:web:08bae47ffbae32a304db52",
  measurementId: "G-NS6ME356NL"
};

export const createUserProfileDocument = async (userAuth, addititonalData) => {
  // we want to save the user object if the user is signed in and not when its null
  if (!userAuth) return; // does not exists
  // query is us asking firestore for some document or collection
  // Firestore returns us two of objects i.e. references and snapshots
  // reference is simply an object that represent current place in the database thata we are asking for

  // we want to check whether or not we have stored this particular user at that reference
  // userRef is thus a queryReference object that contains details about it, method to get the snapshot
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // Testing out collectionReference
  //   const collectionRef = firestore.collection("users");

  // we are getting the snapShot object from the documentReference object using .get()
  const snapShot = await userRef.get();
  // .exists allows us to check if snapshot is available at that particular documentReference

  // checking the querySnapshot/ collectionSnapshot
  //   const collectionSnapshot = await collectionRef.get();
  //   console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

  // user does not exists in the database
  // then we create a new document object
  if (!snapShot.exists) {
    // getting displayName and email from the userAuth object
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // we are making asynchronous request to out database to store this particular user
      // creating a new user object at that particular reference
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addititonalData
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // creating a new document reference for each object and randomly generate an id
    // get a document at an empty string
    const newDocRef = collectionRef.doc();
    // placing all our calls into a batch request
    batch.set(newDocRef, obj);
  });

  await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// provider for google
const provider = new firebase.auth.GoogleAuthProvider();
// setting custom parameters
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
