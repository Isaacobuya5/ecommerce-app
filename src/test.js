import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

// get me a collection of users and get me a document with specified id
let data = firestore.collection('users').doc('3vSKo8txI06JuOTjO2V5').collection('cartItems')
.doc('Etb47yobfOyY0MNHe58n');
console.log(data);
// method2 -> to get the particular item
let data2 = firestore.doc('/users/3vSKo8txI06JuOTjO2V5/cartItems/Etb47yobfOyY0MNHe58n');
console.log(data2)

// if to get a collection of cart items
firestore.collection('/users/3vSKo8txI06JuOTjO2V5/cartItems');