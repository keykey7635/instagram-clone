import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBQSkHMuZrExjdexKweincOUejWWuZOv7U",
  authDomain: "craver-react.firebaseapp.com",
  databaseURL: "https://craver-react.firebaseio.com",
  projectId: "craver-react",
  storageBucket: "craver-react.appspot.com",
  messagingSenderId: "155544339680",
  appId: "1:155544339680:web:f25b233b548f0e7586bc85",
  measurementId: "G-VZ94W23HFY"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage} ;
