import firebase from 'firebase';
var firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const geo = firebase.firestore;
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
