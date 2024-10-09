import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore functions

const firebaseConfig = {
  apiKey: "AIzaSyBlop11Y37Rk0qg-p-unYTdEy51JUwCXIk",
  authDomain: "apartment-connect-62da5.firebaseapp.com",
  projectId: "apartment-connect-62da5",
  storageBucket: "apartment-connect-62da5.appspot.com",
  messagingSenderId: "760204860450",
  appId: "1:760204860450:web:6c77c4f2308c1d7234fe7b",
  measurementId: "G-W30DNWC7VS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); 

export { auth, firestore }; 
