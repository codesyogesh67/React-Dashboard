// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, deleteDoc, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {

  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAGXDgP1CSN6EcYFcNXshs74beVaERzovE",
//   authDomain: "managerapp-99a0d.firebaseapp.com",
//   databaseURL: "https://managerapp-99a0d.firebaseio.com",
//   projectId: "managerapp-99a0d",
//   storageBucket: "managerapp-99a0d.appspot.com",
//   messagingSenderId: "130486693613",
//   appId: "1:130486693613:web:9c02951664af054eb926e4",
//   measurementId: "G-TGHNS5XJ44"
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, getAuth, onAuthStateChanged, provider, where, collection, getDocs, query, updateDoc, deleteDoc, getDoc, doc, addDoc };

export default db;
