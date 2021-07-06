import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBIgNiQvcXWJt-ONSqn1b7hhlGdi3kfX3w",
  authDomain: "twirl-845f4.firebaseapp.com",
  projectId: "twirl-845f4",
  storageBucket: "twirl-845f4.appspot.com",
  messagingSenderId: "646048467376",
  appId: "1:646048467376:web:fc0d6c0b67bf5ced2bee75",
  measurementId: "G-6WQECX3TL5",
});
// Initialize Firebase
export default app;
