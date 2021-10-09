import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAGXDgP1CSN6EcYFcNXshs74beVaERzovE",
  authDomain: "managerapp-99a0d.firebaseapp.com",
  databaseURL: "https://managerapp-99a0d.firebaseio.com",
  projectId: "managerapp-99a0d",
  storageBucket: "managerapp-99a0d.appspot.com",
  messagingSenderId: "130486693613",
  appId: "1:130486693613:web:9c02951664af054eb926e4",
  measurementId: "G-TGHNS5XJ44",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };

export default db;
