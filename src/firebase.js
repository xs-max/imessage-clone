import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfAeZkJpZQqN-oLVejIKoAxeeKO-iA89c",
    authDomain: "imessage-clone-d7251.firebaseapp.com",
    databaseURL: "https://imessage-clone-d7251.firebaseio.com",
    projectId: "imessage-clone-d7251",
    storageBucket: "imessage-clone-d7251.appspot.com",
    messagingSenderId: "690776234520",
    appId: "1:690776234520:web:c7edb15a6686185f48016d",
    measurementId: "G-ZKQZLZSQ4T"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;