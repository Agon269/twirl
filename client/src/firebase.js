import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAPFtadxXKQ7OwQfLuBAQS--3t96UAplFU",
  authDomain: "sream-me.firebaseapp.com",
  projectId: "sream-me",
  storageBucket: "sream-me.appspot.com",
  messagingSenderId: "801265886072",
  appId: "1:801265886072:web:2b6b69e4b6446df3735e8d",
});
// Initialize Firebase
export default app;
